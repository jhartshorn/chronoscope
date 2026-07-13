---
name: improve-data
description: How to improve Chronoscope's historical dataset — add civilisations/peoples/empires/events for a period or region, or raise the spatial (better polygons) and temporal (more snapshots) resolution of existing entities.
---

# Improving Chronoscope's historical & geographical data

Use this workflow whenever the task is "cover period/region X better", "add more
peoples/empires/states", or "make entity Y's borders change over time more
accurately". All work happens in `src/data/` — never touch `src/map` or
`src/history` for a data task. Full schema: `docs/DATA_SCHEMA.md`; editorial
principles: `docs/METHODOLOGY.md` (read both before authoring).

## 1. Survey what already exists

Don't duplicate. Before adding anything:

- Grep `src/data/regions/*.ts` and `src/data/entities.ts` for the entity names
  (and `alternativeNames`) you plan to add. Several regions have multiple
  modules (`britain` + `britain2`, `africa` + `africa2`) — check all of them.
- To see what is active at a date, write a scratch vitest file (delete after):

  ```ts
  import { it } from 'vitest';
  import { ENTITIES } from './index';
  import { activeEntitiesAt } from '../history/engine';
  import { bce } from './helpers';
  it('survey', () => {
    for (const a of activeEntitiesAt(ENTITIES, bce(1200)))
      console.log(a.entity.id, a.entity.category);
  });
  ```

- Gaps to look for: eras where a region shows nothing (the map goes blank),
  long-lived entities with a single snapshot (territory never moves), missing
  predecessor/successor chains (an empire vanishes and nothing replaces it),
  and periods where only polities exist with no underlying `people` /
  `archaeological-culture` layer.

## 2. Research and sources

- Every entity and event needs ≥ 1 `sources` citation (`src(citation, url?, note?)`).
  Cite standard scholarship (e.g. "Byrne 1973, Irish Kings and High-Kings");
  URLs where available. **Never copy geometry from proprietary atlases** — all
  polygons are original, hand-drawn interpretations of the cited scholarship.
- Set `confidence` honestly: `high` = well-documented modern boundary,
  `medium` = reasonable scholarly reconstruction, `low` = schematic range
  (most prehistory and early polities). Low confidence renders as hatching —
  it is a feature, not a defect; do not inflate confidence to avoid it.
- Round deep-prehistoric dates to honest magnitudes; flag traditional/legendary
  dates as approximate in `notes` / `uncertainty` rather than asserting them.
- Keep descriptions politically neutral: archaeological cultures are not ethnic
  identities, territorial continuity is not identity, and modern national
  identities are never projected backwards.

## 3. Authoring entities

- New coverage goes in a new or existing module in `src/data/regions/`. A new
  module exports `export const FOO_ENTITIES: HistoricalEntity[]` and is
  registered by one import + spread in `src/data/index.ts` — nothing else.
  Follow an existing module (e.g. `ireland.ts`) for idiom: a doc comment
  explaining scope and how it hands off to other modules, shared `Ring`
  constants, entities grouped with section comments.
- **Always use the helpers** from `src/data/helpers.ts`:
  - `bce(n)` / `ce(n)` — never hand-compute astronomical years (year 0 = 1 BCE;
    `bce(44).year === -43`). Never use JavaScript `Date`.
  - `poly(ring, ...holes)` / `mpoly(...)` — these normalise ring winding.
    d3-geo is spherical: a mis-wound raw ring fills the entire planet.
  - `snap(year, geometry, confidence, notes?)` — note it takes the raw
    `.year` number, e.g. `snap(ce(800).year, …)`.
- Coordinates are `[longitude, latitude]`. Keep inline polygons deliberately
  coarse — **10–30 vertices** — they are interpretations, not survey data, and
  fills are clipped to the coastline, so slight sea overshoot is fine and often
  desirable (it avoids fake precision along coasts).
- Modern states (and their historical border changes near the present) should
  use `{ naturalEarthCountry: 'Name' }` / `{ naturalEarthCountries: [...] }`
  snapshots so outlines match the basemap. Names must match Natural Earth 110m
  (see `listNaturalEarthCountries()` in `src/map/basemap.ts`; e.g.
  'Dem. Rep. Congo', 'Czechia'). Watch for separate NE polygons (Somaliland,
  N. Cyprus, Kosovo, Palestine, W. Sahara) leaving holes in a dissolved shape.
- Choose `category` carefully: diffuse ranges (`people`,
  `archaeological-culture`, `hominin-species`) render as soft haloed fills and
  sit beneath polities; overlap between layers is intended, not an error.
  Pick `colour` to harmonise with neighbours in the same module (regional
  palettes, e.g. Irish kingdoms are all greens) and set `labelImportance`
  (1 = minor local kingdom … 5 = labelled first) relative to what's nearby.
- Wire up `predecessorIds` / `successorIds` so political lineages are clickable
  chains, and split coverage of one place across modules deliberately (say so
  in the module doc comment, as `ireland.ts` does for 1801/1922 handoffs).

## 4. Raising temporal resolution

More snapshots = smoother, truer animation. The renderer crossfades between
consecutive snapshots, so a single-snapshot empire pops in and out at fixed
size — real rise-and-fall needs snapshots at founding extent, major expansions,
peak, contractions, and eve of fall (the ten key empires have 4–10+ each;
see the fine-grained tests in `src/data/data.test.ts` for the expected bar).

- Snapshots must be in ascending date order (tested).
- Anchor snapshot dates to datable events (a conquest, a treaty) and say which
  in the snapshot `notes`.
- For entities near the present, prefer switching between `naturalEarthCountries`
  compositions per period (see the USSR / EU treatment) over hand-drawn shapes.
- `fadeYears` controls fade in/out at start/end; default scales with time depth —
  override only when an entity ends abruptly (conquest) vs. dissolving slowly.

## 5. Events

Add `HistoricalEvent`s in `src/data/events.ts` for the period you're covering
(battles, migrations, foundations, treaties…). Scale `displayWindowBefore/After`
to the era — tens of millennia for a Palaeolithic dispersal, a decade or two for
a modern event — and use `approximate: true` + `uncertainty` for legendary or
poorly-located events. `importance: 5` events get timeline markers and playback
dwell, so reserve 5 for genuinely era-defining moments.

## 6. Validate — every time, in this order

1. `npm run typecheck`
2. `npm run test` — `src/data/data.test.ts` enforces unique ids, sources,
   ordered snapshots, sane spherical geometry (< 2π steradians), resolvable
   predecessor/successor ids, and modern-state coverage.
3. **Extend the guard tests**: when you materially improve a period, add
   assertions to `data.test.ts` in the style already there — `covers(id, date,
   lon, lat)` point-in-polygon checks pinning border changes to dates (city
   inside before/after a conquest), and minimum-snapshot-count checks for
   entities whose timelines you refined. This is what stops later edits
   silently regressing your work.
4. Visual check: use the **verify** skill (`.Codex/skills/verify/SKILL.md`) —
   dev server + Playwright + `window.__setYear(year)` — and screenshot the
   affected region at a few dates. Data tests can't see rendering problems
   (holes from NE sub-polygons, colour clashes, label pile-ups, polygons that
   read wrong at the era's typical zoom).

## Gotchas

- There is no year 0; astronomical year 0 displays as 1 BCE. "Present day" is
  fixed at 2026.5 — don't end modern entities before it or they fade out.
- `snap()` takes a number (`ce(1066).year`), while entity `start`/`end` take
  `HistoricalDate` objects (`ce(1066)`).
- Entity ids are global across all modules — prefix or qualify generic names
  (`kingdom-of-…`) to avoid collisions.
- Holes in `poly()` are passed as additional rings after the exterior.
- Don't edit `src/map` or `src/history` for data work; if data seems to need a
  renderer change, stop and reconsider the modelling instead.
