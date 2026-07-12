import { geoArea } from 'd3-geo';
import type { MultiPolygon, Polygon } from 'geojson';
import type { HistoricalDate, SourceReference, TerritorySnapshot, Confidence } from '../types';
import { hd } from '../history/date';

/**
 * Authoring helpers for the dataset.
 *
 * All inline geometries are deliberately coarse (10–30 vertices): they are
 * historical interpretations, not survey data, and the renderer clips fills
 * to the coastline anyway. Coordinates are [longitude, latitude].
 *
 * d3-geo treats polygons as spherical, so ring winding decides which side is
 * "inside". `ring()` normalises winding by checking the spherical area — a
 * ring wound the wrong way would otherwise cover the entire planet minus the
 * intended territory.
 */

export type Ring = [number, number][];

function closed(r: Ring): Ring {
  const first = r[0];
  const last = r[r.length - 1];
  return first[0] === last[0] && first[1] === last[1] ? r : [...r, first];
}

function normalised(r: Ring): Ring {
  const c = closed(r);
  const test: Polygon = { type: 'Polygon', coordinates: [c] };
  return geoArea(test) > Math.PI * 2 ? [...c].reverse() : c;
}

export function poly(exterior: Ring, ...holes: Ring[]): Polygon {
  return {
    type: 'Polygon',
    coordinates: [normalised(exterior), ...holes.map((h) => [...normalised(h)].reverse())],
  };
}

export function mpoly(...polys: (Polygon | Ring)[]): MultiPolygon {
  return {
    type: 'MultiPolygon',
    coordinates: polys.map((p) => (Array.isArray(p) ? poly(p).coordinates : p.coordinates)),
  };
}

export function snap(
  year: number,
  geometry: TerritorySnapshot['geometry'],
  confidence: Confidence,
  notes?: string,
): TerritorySnapshot {
  return { date: hd(year), geometry, confidence, notes };
}

export function src(citation: string, url?: string, note?: string): SourceReference {
  return { citation, url, note };
}

export function bce(year: number): HistoricalDate {
  if (year <= 0) throw new Error('BCE years are positive; there is no year zero');
  return hd(1 - year);
}

export function ce(year: number): HistoricalDate {
  if (year <= 0) throw new Error('CE years are positive; there is no year zero');
  return hd(year);
}
