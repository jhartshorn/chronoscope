import { describe, it, expect } from 'vitest';
import * as MED from './mediterranean';
import { geoArea } from 'd3-geo';
import type { Polygon } from 'geojson';

function segmentsIntersect(
  [ax, ay]: [number, number], [bx, by]: [number, number],
  [cx, cy]: [number, number], [dx, dy]: [number, number],
): boolean {
  const d1 = (dx - cx) * (ay - cy) - (dy - cy) * (ax - cx);
  const d2 = (dx - cx) * (by - cy) - (dy - cy) * (bx - cx);
  const d3 = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const d4 = (bx - ax) * (dy - ay) - (by - ay) * (dx - ax);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true;
  return false;
}

function isSimple(ring: [number, number][]): string | null {
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n];
    for (let j = i + 1; j < n; j++) {
      if (j === i) continue;
      const c = ring[j], d = ring[(j + 1) % n];
      // skip adjacent segments (share an endpoint)
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (segmentsIntersect(a, b, c, d)) {
        return `edge ${i} (${a})-(${b}) crosses edge ${j} (${c})-(${d})`;
      }
    }
  }
  return null;
}

// planar point-in-polygon (ray casting) — fine approximation for these small regions
function pointInRing(pt: [number, number], ring: [number, number][]): boolean {
  const [x, y] = pt;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// crude overlap-area estimate via grid sampling over the union bbox
function overlapFraction(a: [number, number][], b: [number, number][]): number {
  const xs = [...a, ...b].map((p) => p[0]);
  const ys = [...a, ...b].map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const N = 60;
  let bothCount = 0, eitherCount = 0;
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {
      const x = minX + ((maxX - minX) * i) / N;
      const y = minY + ((maxY - minY) * j) / N;
      const inA = pointInRing([x, y], a);
      const inB = pointInRing([x, y], b);
      if (inA && inB) bothCount++;
      if (inA || inB) eitherCount++;
    }
  }
  return eitherCount === 0 ? 0 : bothCount / eitherCount;
}

const ALL_RINGS: Record<string, [number, number][]> = Object.fromEntries(
  Object.entries(MED).filter(([, v]) => Array.isArray(v)) as [string, [number, number][]][],
);

describe('mediterranean geometry sanity', () => {
  for (const [name, ring] of Object.entries(ALL_RINGS)) {
    it(`${name} is a simple (non-self-intersecting) ring`, () => {
      const problem = isSimple(ring);
      expect(problem, `${name}: ${problem}`).toBeNull();
    });
    it(`${name} has sane spherical area`, () => {
      const closed = [...ring, ring[0]];
      const g: Polygon = { type: 'Polygon', coordinates: [closed] };
      const area = Math.min(geoArea(g), Math.PI * 4 - geoArea(g));
      expect(area).toBeGreaterThan(0);
      expect(area).toBeLessThan(Math.PI * 2);
    });
  }

  // pairs that are combined together in the same mpoly() snapshot and are
  // land-adjacent — must not overlap
  const adjacentPairs: [string, string][] = [
    ['GAUL', 'NARBONENSIS'],
    ['GAUL', 'IBERIA'],
    ['NARBONENSIS', 'IBERIA'],
    ['BALKANS', 'GREECE'],
    ['BALKANS', 'THRACE'],
    ['GREECE', 'THRACE'],
    ['BALKANS', 'DACIA'],
    ['NAFRICA', 'CYRENAICA'],
    ['CYRENAICA', 'EGYPT'],
    ['EGYPT', 'ARABIA_PETRAEA'],
    ['LEVANT', 'ARABIA_PETRAEA'],
    ['LEVANT', 'MESOPOTAMIA'],
    ['ARABIA_PETRAEA', 'MESOPOTAMIA'],
  ];
  for (const [a, b] of adjacentPairs) {
    it(`${a} and ${b} do not overlap`, () => {
      const frac = overlapFraction(ALL_RINGS[a], ALL_RINGS[b]);
      expect(frac, `${a}/${b} overlap fraction ${frac}`).toBeLessThan(0.02);
    });
  }
});
