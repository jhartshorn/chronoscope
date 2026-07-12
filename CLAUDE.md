# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Chronoscope: an interactive Canvas map of human history (300,000 BCE → present). React + TypeScript + Vite. Not a git repository (as of writing).

## Commands

```bash
npm run dev            # dev server at http://localhost:5178 (fixed port; Playwright depends on it)
npm run build          # tsc -b && vite build → dist/ (production base path is /chronoscope/)
npm run typecheck      # tsc -b --noEmit
npm run test           # all vitest unit tests
npx vitest run src/history/engine.test.ts        # single test file
npx vitest run -t "name of test"                 # single test by name
npm run test:e2e       # Playwright (first time: npx playwright install chromium; starts/reuses dev server)
npm run screenshots    # regenerate screenshots/ via e2e/screenshots.spec.ts
```

## Architecture

Three strictly separated layers (see `docs/ARCHITECTURE.md` for the full picture):

1. **Data** (`src/types`, `src/data`) — plain serialisable entities/events. `src/data/regions/*.ts` hold region/theme modules spread into one `ENTITIES` array in `src/data/index.ts`.
2. **Historical engine** (`src/history`, `src/animation`) — pure, no DOM. `date.ts` (astronomical years, year 0 = 1 BCE, never displayed), `timescale.ts` (invertible non-linear slider↔date curve), `engine.ts` (which entities/events are active at a date, fade alphas, snapshot blend pairs), `playback.ts` (advances in **slider space**, injectable ticker for deterministic tests), `timeStore.ts` (tiny external store holding slider position 0..1).
3. **Renderer + UI** — `src/map` is a self-contained Canvas 2D renderer (d3-geo Equal Earth, pan/zoom, hit-testing, labels, Natural Earth basemap via `world-atlas`); `src/components` is a thin React shell. They communicate only through the engine's `ActiveEntity[]`/`ActiveEvent[]` output, so the renderer is swappable without touching history or data.

**Performance contract to preserve:** playback mutates the timeStore and the canvas redraws directly — React must NOT re-render during animation (only `Timeline` subscribes reactively, via `useSyncExternalStore` in `src/hooks.ts`). The renderer draws only when marked dirty and caches projected geometry as `Path2D` keyed by `(geometry, view.version)`. Don't route per-frame state through React or invalidate these caches casually.

## Adding historical data

- Edit/add files in `src/data/regions/` (or `src/data/events.ts`); nothing in `src/map` needs to change. New region module = one import + spread in `src/data/index.ts`.
- Always use the authoring helpers in `src/data/helpers.ts` (`bce`, `ce`, `poly`, `snap`, `src`) — `poly` normalises polygon winding, and d3-geo treats rings spherically, so a mis-wound ring fills the entire planet.
- Modern states should use `{ naturalEarthCountry: 'Name' }` snapshots so coastlines match the basemap.
- `src/data/data.test.ts` enforces unique ids, resolvable predecessor/successor links, ordered snapshots, sane geometry and required sources — run it after any data change. Full schema in `docs/DATA_SCHEMA.md`.

## Conventions and gotchas

- Dates are plain numbers (astronomical convention); never use JavaScript `Date`.
- "Present day" is fixed at mid-2026; the timescale curve constant `C = 55` is tuned — changing either shifts the whole slider.
- Production builds are served from `/chronoscope/` (`base` in `vite.config.ts`); dev and tests run at `/`.
- Every entity/event must carry `sources` citations and a `confidence`; geometries are hand-authored interpretations — never copy from proprietary atlases.
- `Ctrl+P` in the app toggles a live FPS/frame-time perf overlay, useful when touching the renderer.
