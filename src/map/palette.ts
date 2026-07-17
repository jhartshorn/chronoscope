import type { Confidence, EntityCategory } from '../types';

/**
 * The map's visual language. One polished "aged atlas" theme:
 * warm parchment land, muted ocean, restrained territorial colours.
 */
export const THEME = {
  ocean: '#a8bfc9',
  oceanDeep: '#9db4bf',
  sphereStroke: 'rgba(60, 50, 35, 0.35)',
  graticule: 'rgba(70, 90, 100, 0.16)',
  land: '#e8dfc8',
  landShade: '#d9cfb4',
  coastline: 'rgba(92, 78, 54, 0.55)',
  labelFill: '#3d3020',
  labelHalo: 'rgba(240, 233, 214, 0.85)',
  eventFill: '#fdf6e3',
  eventStroke: '#5c4a2e',
} as const;

/** Muted, atlas-like colours per category. Entities may override. */
export const CATEGORY_COLOURS: Record<EntityCategory, string> = {
  'hominin-species': '#8a6d3b',
  'archaeological-culture': '#7d8b5a',
  people: '#9a7b4f',
  civilisation: '#b0713f',
  'city-state': '#a85f4a',
  kingdom: '#7a5ea8',
  republic: '#4a7ba8',
  empire: '#a84a5a',
  confederation: '#5aa88a',
  'colonial-possession': '#c2884e',
  'modern-state': '#5a7ea8',
  other: '#888070',
};

export const CATEGORY_LABELS: Record<EntityCategory, string> = {
  'hominin-species': 'Hominin species',
  'archaeological-culture': 'Archaeological culture',
  people: 'People',
  civilisation: 'Civilisation',
  'city-state': 'City-state',
  kingdom: 'Kingdom',
  republic: 'Republic',
  empire: 'Empire',
  confederation: 'Confederation',
  'colonial-possession': 'Colonial possession',
  'modern-state': 'Modern state',
  other: 'Other',
};

/** Diffuse ranges get low fill opacity; documented polities get more body. */
export const CATEGORY_FILL_OPACITY: Record<EntityCategory, number> = {
  'hominin-species': 0.2,
  'archaeological-culture': 0.28,
  people: 0.28,
  civilisation: 0.42,
  'city-state': 0.5,
  kingdom: 0.5,
  republic: 0.5,
  empire: 0.48,
  confederation: 0.45,
  'colonial-possession': 0.42,
  'modern-state': 0.45,
  other: 0.35,
};

/** Categories drawn as soft ranges rather than bordered polities. */
export const DIFFUSE_CATEGORIES: ReadonlySet<EntityCategory> = new Set([
  'hominin-species',
  'archaeological-culture',
  'people',
]);

export const EVENT_CATEGORY_COLOURS: Record<string, string> = {
  migration: '#7d8b5a',
  settlement: '#8a6d3b',
  agriculture: '#6b8f3d',
  city: '#a85f4a',
  battle: '#a84a5a',
  politics: '#4a7ba8',
  religion: '#7a5ea8',
  science: '#3d8f8a',
  technology: '#3d8f8a',
  pandemic: '#6d6d6d',
  revolution: '#c25e4e',
  voyage: '#4a8fa8',
  treaty: '#5aa88a',
  disaster: '#6d6d6d',
  culture: '#b0713f',
  other: '#888070',
};

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function darken(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  const f = (i: number) =>
    Math.max(0, Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - amount)))
      .toString(16)
      .padStart(2, '0');
  return `#${f(0)}${f(2)}${f(4)}`;
}

/**
 * Edge treatment is the uncertainty signal: only high-confidence geometry
 * gets a crisp boundary line; medium and low confidence drop the line and
 * feather the fill outward instead — the wider the feather (screen px at
 * zoom 1), the less certain the extent.
 */
export const CONFIDENCE_EDGE: Record<Confidence, { boundary: boolean; feather: number }> = {
  high: { boundary: true, feather: 0 },
  medium: { boundary: false, feather: 5 },
  low: { boundary: false, feather: 14 },
};
