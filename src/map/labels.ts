import { geoCentroid, geoPath, type GeoProjection } from 'd3-geo';
import type { Geometry } from 'geojson';
import type { ActiveEntity } from '../types';
import { DIFFUSE_CATEGORIES } from './palette';

/**
 * Atlas-style label placement.
 *
 * Each visible entity gets a candidate label anchored at its geographic
 * centroid, sized by its on-screen footprint, rotated to the territory's
 * principal axis, and letter-spaced when large. A greedy pass drops labels
 * that would collide, keeping the most important first.
 */

export interface PlacedLabel {
  entityId: string;
  text: string;
  x: number;
  y: number;
  /** Radians, clamped to a readable range. */
  angle: number;
  fontSize: number;
  letterSpacing: number;
  alpha: number;
  /** Diffuse cultures/species render italic; polities render small caps. */
  diffuse: boolean;
  colour: string;
}

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

function boxesOverlap(a: Box, b: Box): boolean {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

/** Principal axis of the projected geometry via PCA over sampled ring points. */
function principalAngle(geometry: Geometry, projection: GeoProjection): number {
  const pts: [number, number][] = [];
  const collect = (coords: number[][]) => {
    const step = Math.max(1, Math.floor(coords.length / 40));
    for (let i = 0; i < coords.length; i += step) {
      const p = projection(coords[i] as [number, number]);
      if (p) pts.push(p);
    }
  };
  if (geometry.type === 'Polygon') collect(geometry.coordinates[0]);
  else if (geometry.type === 'MultiPolygon')
    for (const poly of geometry.coordinates) collect(poly[0]);
  if (pts.length < 4) return 0;
  let mx = 0;
  let my = 0;
  for (const [x, y] of pts) {
    mx += x;
    my += y;
  }
  mx /= pts.length;
  my /= pts.length;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    const dx = x - mx;
    const dy = y - my;
    sxx += dx * dx;
    sxy += dx * dy;
    syy += dy * dy;
  }
  const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  // Clamp to a readable slope, and only rotate clearly elongated shapes.
  const elongation = Math.abs(sxx - syy) / (sxx + syy + 1e-9);
  if (elongation < 0.25) return 0;
  const max = Math.PI * 0.19; // ~±35°
  return Math.min(max, Math.max(-max, angle));
}

export interface LabelInput {
  active: ActiveEntity;
  geometry: Geometry;
  colour: string;
}

export function placeLabels(
  inputs: LabelInput[],
  projection: GeoProjection,
  width: number,
  height: number,
  measure: (text: string, fontSize: number, letterSpacing: number) => number,
): PlacedLabel[] {
  const path = geoPath(projection);
  const candidates: (PlacedLabel & { priority: number; box: Box })[] = [];

  for (const { active, geometry, colour } of inputs) {
    const entity = active.entity;
    const centroid = geoCentroid(geometry as never);
    const p = projection(centroid);
    if (!p) continue;
    const [x, y] = p;
    if (x < -50 || y < -50 || x > width + 50 || y > height + 50) continue;

    const [[bx0, by0], [bx1, by1]] = path.bounds(geometry as never);
    const bw = bx1 - bx0;
    const bh = by1 - by0;
    const footprint = Math.sqrt(Math.max(0, bw * bh));

    let fontSize = Math.min(26, 7 + footprint * 0.055);
    const importance = entity.labelImportance ?? 3;
    fontSize *= 0.85 + importance * 0.06;
    if (fontSize < 8.5) continue; // too small to read — fade out entirely

    const alphaFromSize = Math.min(1, (fontSize - 8.5) / 3);
    const diffuse = DIFFUSE_CATEGORIES.has(entity.category);
    const text = diffuse ? entity.name : entity.name.toUpperCase();
    const letterSpacing = footprint > 260 ? Math.min(8, fontSize * 0.45) : fontSize * 0.08;
    const angle = footprint > 120 ? principalAngle(geometry, projection) : 0;

    const w = measure(text, fontSize, letterSpacing);
    const h = fontSize * 1.3;
    const box: Box = { x0: x - w / 2 - 4, y0: y - h / 2 - 2, x1: x + w / 2 + 4, y1: y + h / 2 + 2 };

    candidates.push({
      entityId: entity.id,
      text,
      x,
      y,
      angle,
      fontSize,
      letterSpacing,
      alpha: active.alpha * alphaFromSize,
      diffuse,
      colour,
      priority: importance * 1000 + footprint,
      box,
    });
  }

  candidates.sort((a, b) => b.priority - a.priority);
  const placed: (PlacedLabel & { priority: number; box: Box })[] = [];
  for (const c of candidates) {
    if (placed.some((p) => boxesOverlap(p.box, c.box))) continue;
    placed.push(c);
  }
  return placed;
}
