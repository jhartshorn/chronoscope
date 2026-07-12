# Data schema

All types live in [`src/types/index.ts`](../src/types/index.ts). The dataset is
plain data in `src/data/entities.ts` and `src/data/events.ts`; add to it without
touching any rendering code.

## HistoricalDate

```ts
interface HistoricalDate { year: number }
```

A single continuous number in the **astronomical convention**:

| `year` | Displayed as |
| --- | --- |
| `2026.5` | Present day |
| `1945` | 1945 |
| `1066` | 1066 |
| `0` | **1 BCE** (never “0”) |
| `-43` | 44 BCE |
| `-299999` | 300,000 BCE |

Fractional years encode months for the recent past (`1969.54` → “July 1969”).
Use the `bce(n)` / `ce(n)` helpers so you never have to do the off‑by‑one yourself:
`bce(44).year === -43`, `ce(1066).year === 1066`. There is deliberately no year 0.

```ts
interface HistoricalDuration { years: number }   // helper: years(n)
```

## HistoricalEntity

```ts
interface HistoricalEntity {
  id: string;
  name: string;
  alternativeNames?: string[];
  category:
    | 'hominin-species' | 'archaeological-culture' | 'people' | 'civilisation'
    | 'city-state' | 'kingdom' | 'republic' | 'empire' | 'confederation'
    | 'colonial-possession' | 'modern-state' | 'other';
  start: HistoricalDate;
  end: HistoricalDate;
  snapshots: TerritorySnapshot[];   // ordered by date ascending
  colour?: string;                  // overrides the category colour
  parentEntityId?: string;
  predecessorIds?: string[];        // shown as clickable chips in the panel
  successorIds?: string[];
  description?: string;
  sources: SourceReference[];       // required — at least one
  confidence: 'high' | 'medium' | 'low';
  fadeYears?: number;               // fade-in/out length; default scales with depth
  labelImportance?: 1 | 2 | 3 | 4 | 5;  // 5 = labelled first
}
```

### TerritorySnapshot

```ts
interface TerritorySnapshot {
  date: HistoricalDate;
  geometry:
    | Polygon | MultiPolygon
    | { naturalEarthCountry: string }
    | { naturalEarthCountries: string[] };
  confidence: 'high' | 'medium' | 'low';
  notes?: string;                   // explains uncertainty / disputed boundaries
}
```

- Coordinates are `[longitude, latitude]`.
- Geometry may be inline GeoJSON, **or** a reference to a Natural Earth country by
  name (looked up at load time) so modern states match the basemap coastline.
- `naturalEarthCountries` (plural) dissolves several countries into one shape with
  shared borders removed — used for multi-state polities such as the post-war USSR
  (its fifteen republics) and the European Union at each stage of enlargement.
- With ≥ 2 snapshots the renderer crossfades between them across the intervening
  dates, so territory changes animate smoothly rather than snapping.
- `confidence: 'low'` adds a hatch fill; `medium`/`low` also change the border dash
  pattern — a non‑colour uncertainty signal.

### SourceReference

```ts
interface SourceReference { citation: string; url?: string; note?: string }
```

## HistoricalEvent

```ts
interface HistoricalEvent {
  id: string;
  title: string;
  date: HistoricalDate;
  endDate?: HistoricalDate;                 // for spanning events (wars, pandemics)
  location: { latitude: number; longitude: number; approximate?: boolean };
  category:
    | 'migration' | 'settlement' | 'agriculture' | 'city' | 'battle' | 'politics'
    | 'religion' | 'science' | 'technology' | 'pandemic' | 'revolution' | 'voyage'
    | 'treaty' | 'disaster' | 'culture' | 'other';
  description: string;
  importance: 1 | 2 | 3 | 4 | 5;            // size, label priority, dwell eligibility
  displayWindowBefore: HistoricalDuration;  // visible this long before the date
  displayWindowAfter: HistoricalDuration;   // …and after (widen for deep prehistory)
  sources: SourceReference[];
  uncertainty?: string;                     // shown in the event panel
}
```

Events ramp in over `displayWindowBefore` and out over `displayWindowAfter`
(smoothstep). Scale the windows to the era: tens of thousands of years for a
Palaeolithic dispersal, a decade or two for a modern event. `importance >= 5`
events are eligible for “dwell” pauses during playback and appear as markers on the
timeline. `approximate: true` draws a dashed marker ring.

## Engine outputs (renderer contract)

The renderer never sees raw entities during a frame — only these, produced by
`src/history/engine.ts`:

```ts
interface ActiveEntity {
  entity: HistoricalEntity;
  alpha: number;               // 0..1 fade multiplier
  fromSnapshot: TerritorySnapshot;
  toSnapshot: TerritorySnapshot;
  blend: number;               // 0..1 crossfade factor
}
interface ActiveEvent {
  event: HistoricalEvent;
  alpha: number;               // 0..1
  occurring: boolean;          // date within [date, endDate]
}
```

## Import format for bulk data

The in‑repo dataset is TypeScript for type‑safety, but the shapes above are plain
JSON‑compatible objects (geometry is standard GeoJSON). To import a larger corpus,
emit an array of `HistoricalEntity` / `HistoricalEvent` JSON and `parseDate()`
(in `src/history/date.ts`) will turn `"44 BCE"`, `"1066"`, `"300,000 BCE"` strings
into `HistoricalDate`s. Validation lives in `src/data/data.test.ts` — extend it to
guard imported data.
