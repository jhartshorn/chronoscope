import type { MultiPolygon, Polygon } from 'geojson';

/**
 * A point in historical time.
 *
 * `year` uses the astronomical convention as a continuous number:
 *   -  2026.5  ≈ mid-2026 CE
 *   -  1066    = 1066 CE
 *   -  0       = 1 BCE   (never *displayed* as "year 0")
 *   -  -43     = 44 BCE
 *   -  -299999 = 300,000 BCE
 *
 * JavaScript's Date object is never used for timeline arithmetic; it cannot
 * represent this range. Fractional years carry month-level detail for the
 * recent past.
 */
export interface HistoricalDate {
  year: number;
}

/** A span of historical time, in (possibly fractional) years. */
export interface HistoricalDuration {
  years: number;
}

export type Confidence = 'high' | 'medium' | 'low';

export interface SourceReference {
  /** Short citation, e.g. "Hublin et al. 2017, Nature 546" */
  citation: string;
  url?: string;
  note?: string;
}

export type EntityCategory =
  | 'hominin-species'
  | 'archaeological-culture'
  | 'people'
  | 'civilisation'
  | 'city-state'
  | 'kingdom'
  | 'republic'
  | 'empire'
  | 'confederation'
  | 'colonial-possession'
  | 'modern-state'
  | 'other';

/**
 * Geometry for a snapshot: either inline GeoJSON, or a reference to one or
 * more Natural Earth country polygons resolved at load time (used for modern
 * states so their coastlines match the basemap exactly). Multiple countries
 * are dissolved into a single shape — shared borders disappear — which is how
 * multi-state polities (USSR, EU) are expressed.
 */
export type SnapshotGeometry =
  | Polygon
  | MultiPolygon
  | { naturalEarthCountry: string }
  | { naturalEarthCountries: string[] };

export interface TerritorySnapshot {
  date: HistoricalDate;
  geometry: SnapshotGeometry;
  confidence: Confidence;
  /** Explains uncertainty, disputed boundaries, interpretation choices. */
  notes?: string;
}

export interface HistoricalEntity {
  id: string;
  name: string;
  alternativeNames?: string[];
  category: EntityCategory;
  start: HistoricalDate;
  end: HistoricalDate;
  /** Ordered by date ascending. */
  snapshots: TerritorySnapshot[];
  colour?: string;
  parentEntityId?: string;
  /** Ids of entities that historically preceded / followed this one. */
  predecessorIds?: string[];
  successorIds?: string[];
  description?: string;
  sources: SourceReference[];
  confidence: Confidence;
  /**
   * How long (in years) the fade-in before `start` and fade-out after `end`
   * should last. Defaults are derived from historical depth if omitted.
   */
  fadeYears?: number;
  /** Relative label prominence 1..5 (5 = always label first). */
  labelImportance?: 1 | 2 | 3 | 4 | 5;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  date: HistoricalDate;
  endDate?: HistoricalDate;
  location: {
    latitude: number;
    longitude: number;
    approximate?: boolean;
  };
  category:
    | 'migration'
    | 'settlement'
    | 'agriculture'
    | 'city'
    | 'battle'
    | 'politics'
    | 'religion'
    | 'science'
    | 'technology'
    | 'pandemic'
    | 'revolution'
    | 'voyage'
    | 'treaty'
    | 'disaster'
    | 'culture'
    | 'other';
  description: string;
  importance: 1 | 2 | 3 | 4 | 5;
  displayWindowBefore: HistoricalDuration;
  displayWindowAfter: HistoricalDuration;
  sources: SourceReference[];
  /** Extra context / uncertainty note shown in the event panel. */
  uncertainty?: string;
}

/** An entity that is visible at the current date, with rendering state. */
export interface ActiveEntity {
  entity: HistoricalEntity;
  /** 0..1 opacity multiplier from fade-in/out around start/end. */
  alpha: number;
  /** The snapshot pair being crossfaded, and the blend factor 0..1. */
  fromSnapshot: TerritorySnapshot;
  toSnapshot: TerritorySnapshot;
  blend: number;
}

/** An event visible at the current date. */
export interface ActiveEvent {
  event: HistoricalEvent;
  /** 0..1 — ramps up before the date, down after the window closes. */
  alpha: number;
  /** True while current date is inside [date, endDate ?? date]. */
  occurring: boolean;
}
