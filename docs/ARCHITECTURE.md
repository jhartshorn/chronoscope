# Architecture

Chronoscope separates three concerns so the renderer can be replaced without
touching the history model, and the data can grow without touching either.

```
                 ┌─────────────────────────────────────────────┐
   data (pure)   │  src/types      shared interfaces (contract) │
                 │  src/data       entities, events, helpers     │
                 └───────────────┬─────────────────────────────┘
                                 │ HistoricalEntity / HistoricalEvent
                 ┌───────────────▼─────────────────────────────┐
  engine (pure)  │  src/history/date        BCE-capable dates    │
                 │  src/history/timescale   non-linear slider↔date│
                 │  src/history/engine      active sets, fades,   │
                 │                          snapshot interpolation │
                 │  src/animation/playback  slider-space playback │
                 │  src/animation/timeStore external store (0..1) │
                 └───────────────┬─────────────────────────────┘
                                 │ ActiveEntity[] / ActiveEvent[]
       ┌─────────────────────────┼───────────────────────────────┐
       │                         │                                │
┌──────▼───────────┐   ┌─────────▼──────────┐        ┌────────────▼─────────┐
│ src/map (Canvas) │   │ src/components     │        │ src/hooks            │
│ renderer, view,  │   │ React UI shell      │        │ useSyncExternalStore │
│ labels, basemap  │   │ (panels, timeline)  │        │ bridges store→React  │
└──────────────────┘   └─────────────────────┘        └──────────────────────┘
```

## The three layers

### 1. Data (`src/types`, `src/data`) — pure, serialisable

`HistoricalEntity` and `HistoricalEvent` are plain data. Geometry is GeoJSON, or a
`{ naturalEarthCountry }` reference resolved at load time so modern borders match
the basemap. Authoring helpers normalise polygon winding (critical: d3‑geo treats
rings spherically, so a mis‑wound ring would fill the whole planet).

### 2. Historical engine (`src/history`, `src/animation`) — pure, no DOM

- **`date.ts`** — a date is a single continuous number using the astronomical
  convention (year 0 = 1 BCE), so ±300,000 years is trivial and no JavaScript
  `Date` object is used. Formatting rounds by magnitude and never prints a year 0.
- **`timescale.ts`** — `sliderPositionToDate` / `dateToSliderPosition` are exact
  mathematical inverses built from one smooth logarithmic curve over “years before
  present.” Monotonic, seamless, no piecewise joints. Also generates zoom‑aware
  tick marks.
- **`engine.ts`** — given the dataset and a date, returns which entities/events are
  active, each with a fade `alpha` (smoothstep in/out around start/end) and the pair
  of `TerritorySnapshot`s to blend with a `blend` factor. `ActiveSetCache` narrows
  the candidate list only when the date leaves a neighbourhood, but alphas are always
  recomputed so motion stays smooth.
- **`playback.ts`** — advances the slider in **slider space**, not calendar space,
  so the on‑screen rate stays usable across the non‑linear scale. Handles speeds,
  loop, restart, and “dwell at major events.” Injectable ticker → deterministic
  tests.
- **`timeStore.ts`** — a 20‑line external store holding the slider position. The
  renderer and the date read‑out subscribe directly; React reads it through
  `useSyncExternalStore`. This is why 60 fps playback does **not** re‑render React.

### 3a. Map renderer (`src/map`) — isolated, swappable

A single `MapRenderer` class drawing to a Canvas 2D context:

- **`view.ts`** — `MapViewState` wraps a d3‑geo **Equal Earth** projection fitted to
  the canvas, composed with a zoom/pan transform. Provides `invert` for hit‑testing
  and `fitGeometry` for fly‑to.
- **Projection choice** — Equal Earth is equal‑area with gentle distortion and no
  dependence on web‑Mercator tiling, appropriate for a whole‑world, deep‑time map.
  This is the documented compromise the brief asked for: we do **not** use Mercator.
- **`renderer.ts`** — the draw loop only runs when marked dirty (time/view/hover/
  selection/size change). Projected geometry is cached as `Path2D` keyed by
  `(geometry, view.version)`, so timeline playback with a static camera costs only
  fills/strokes — no re‑projection per frame. Territory fills are clipped to the
  coastline; only high‑confidence polities get a crisp boundary line — medium‑ and
  low‑confidence extents (and diffuse ranges) are borderless with a feathered fill
  edge that widens as confidence drops. Crossfade blends
  topologically incompatible snapshots by opacity. Event markers are clustered in
  screen space.
- **`labels.ts`** — centroid‑anchored labels sized by on‑screen footprint and
  importance, rotated to each territory’s PCA principal axis (clamped to a readable
  slope), letter‑spaced for large empires, placed greedily with collision rejection.
- **`basemap.ts`** — Natural Earth land/countries via `world-atlas`; 110m immediate,
  50m lazy‑loaded and swapped in above ~2.5× zoom.

### 3b. React shell (`src/components`)

Thin. `App.tsx` owns selection state and wires global keyboard shortcuts. `MapView`
mounts the canvas and forwards renderer callbacks. `Timeline` is the only component
that reads the slider position reactively (for the handle/date); the canvas updates
itself. Panels, search, legend, methodology modal, visible‑entity list and the perf
overlay are ordinary presentational components.

## Performance model

- Playback mutates one number in an external store → canvas redraw only; **zero**
  React re‑renders during animation.
- `Path2D` projection cache → static‑camera playback re‑fills cached paths.
- `ActiveSetCache` → activation candidates recomputed only when time moves far.
- Canvas draws only when dirty; DPR capped at 2.
- Geometry detail is level‑of‑detail (110m → 50m on zoom); full‑resolution data is
  never loaded up front, and the 50m land file is a lazy code‑split chunk.
- `Ctrl`+`P` toggles a live FPS / frame‑time / active‑count overlay.

## Replacing the renderer

Because the renderer consumes only `ActiveEntity` / `ActiveEvent` (plain data with
alphas and blend factors) and owns nothing else, a WebGL/deck.gl renderer can be
dropped in by implementing the same `attach/detach/resize/view` surface and reading
the same active sets from the engine. No change to `src/history`, `src/data` or the
React shell is required.
