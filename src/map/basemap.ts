import { feature, merge } from 'topojson-client';
import type { FeatureCollection, Geometry, MultiPolygon, Polygon } from 'geojson';
import type { SnapshotGeometry } from '../types';
import land110Topo from 'world-atlas/land-110m.json';
import countries110Topo from 'world-atlas/countries-110m.json';

/**
 * Basemap geometry from Natural Earth (public domain), via the world-atlas
 * package. 110m resolution loads immediately; 50m is fetched lazily and
 * swapped in for close zooms.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
const land110 = feature(land110Topo as any, (land110Topo as any).objects.land) as unknown as FeatureCollection;
const countries110 = feature(
  countries110Topo as any,
  (countries110Topo as any).objects.countries,
) as unknown as FeatureCollection;

let land50: FeatureCollection | null = null;
let land50Loading = false;

export function getLand(highDetail: boolean): FeatureCollection {
  if (highDetail && land50) return land50;
  return land110;
}

/** Kick off the 50m load; `onReady` fires once when it becomes available. */
export function ensureHighDetailLand(onReady: () => void): void {
  if (land50 || land50Loading) return;
  land50Loading = true;
  import('world-atlas/land-50m.json')
    .then((mod) => {
      const topo = (mod as any).default ?? mod;
      land50 = feature(topo, topo.objects.land) as unknown as FeatureCollection;
      onReady();
    })
    .catch(() => {
      land50Loading = false; // allow retry
    });
}

const countryByName = new Map<string, Geometry>();
for (const f of countries110.features) {
  const name = (f.properties as { name?: string } | null)?.name;
  if (name && f.geometry) countryByName.set(name, f.geometry);
}

// TopoJSON geometry objects (pre-`feature`) by name, for topology-aware
// merging: `merge` dissolves shared borders, which plain concatenation of
// GeoJSON rings cannot do.
const topoCountryByName = new Map<string, unknown>();
for (const g of (countries110Topo as any).objects.countries.geometries) {
  const name = g.properties?.name;
  if (name) topoCountryByName.set(name, g);
}

const mergedCache = new Map<string, MultiPolygon>();

/** Union of several Natural Earth countries with internal borders dissolved. */
function mergedCountries(names: string[]): MultiPolygon {
  const key = names.join('|');
  const cached = mergedCache.get(key);
  if (cached) return cached;
  const objects = names.map((n) => {
    const found = topoCountryByName.get(n);
    if (!found) throw new Error(`Natural Earth country not found: "${n}"`);
    return found;
  });
  const out = merge(countries110Topo as any, objects as any) as MultiPolygon;
  mergedCache.set(key, out);
  return out;
}

/**
 * Resolve a snapshot geometry: inline GeoJSON passes through; Natural Earth
 * country references are looked up by name so modern states match the
 * basemap coastline exactly. A list of countries resolves to their union.
 */
export function resolveGeometry(g: SnapshotGeometry): Polygon | MultiPolygon {
  if ('naturalEarthCountry' in g) {
    const found = countryByName.get(g.naturalEarthCountry);
    if (!found) throw new Error(`Natural Earth country not found: "${g.naturalEarthCountry}"`);
    return found as Polygon | MultiPolygon;
  }
  if ('naturalEarthCountries' in g) return mergedCountries(g.naturalEarthCountries);
  return g;
}

export function listNaturalEarthCountries(): string[] {
  return [...countryByName.keys()].sort();
}
