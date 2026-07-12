# Known limitations

Chronoscope is a working demonstration of an architecture, with a representative —
not comprehensive — dataset. The limitations below are deliberate scope boundaries
or honest trade‑offs, not defects to hide.

## Historical / data limitations

- **Representative, not complete.** The starter dataset has ~288 entities and 52
  events across twenty data modules (`src/data/entities.ts` plus `src/data/regions/*`),
  spanning every inhabited continent and every period and system (hominins → modern
  states). It is still a curated selection, not a full historical atlas: many
  smaller, shorter‑lived or less‑documented states are omitted, and coverage remains
  denser for Eurasia than for, say, pre‑colonial North America or interior Africa.
- **A few entries predate the timeline.** The slider floor is 300,000 BCE, so
  entities whose span lies mostly earlier — *Australopithecus afarensis*, and the
  earliest portions of *Homo erectus* and *Homo heidelbergensis* — are included for
  reference and are findable via search, but only the part overlapping the window is
  ever drawn on the map (afarensis, at ~3 Ma, is not drawn at all).
- **Coarse geometries.** Historic polygons are hand‑drawn envelopes of 10–30
  vertices. They convey rough shape and reach, not surveyed borders, and some
  intentionally overshoot the coast (fills are clipped, so this is invisible).
- **Sparse snapshots.** Most entities have 1–3 territorial snapshots. Real extents
  fluctuated far more; between snapshots the app crossfades rather than reconstructing
  intermediate borders.
- **Editorial dating.** Start/end years for fuzzy entities (peoples, cultures,
  “civilisations”) are editorial simplifications of gradual processes.
- **Prehistoric ranges are schematic.** Hominin and culture ranges are smoothed
  envelopes of inferred presence from scattered finds, deliberately drawn soft and
  hatched. They should never be read as boundaries.
- **Eurocentric density.** The sample skews toward well‑documented Mediterranean and
  Eurasian polities simply because they are easiest to source concisely; this is a
  property of the sample, not a historical judgement.

## Technical limitations

- **Crossfade, not true morphing.** Topologically incompatible snapshots are blended
  by opacity (with hatch/halo cues), not by vertex morphing. This is stable and
  legible but does not animate a border *sliding*. Compatible geometries could be
  vertex‑interpolated in a future pass.
- **Label placement is greedy, not optimal.** Labels are sized, rotated to a
  principal axis, and placed with greedy collision rejection. It reads well but is
  not a full typeset‑atlas label engine (no curved baselines along arbitrary spines,
  limited de‑confliction with events).
- **Equal Earth only.** One projection is implemented. It is a good world‑history
  choice, but there is no projection switcher, and extreme zoom exaggerates its
  distortion at high latitudes.
- **Point-in-polygon hit-testing** uses spherical `geoContains` per active entity per
  query; fine at this scale, but a spatial index would be needed for thousands of
  simultaneous polygons.
- **50m land only for close zoom.** Below ~2.5× zoom the 110m coastline is used; the
  50m upgrade is lazy‑loaded. There is no 10m tier, so very close zooms stay coarse.
- **No persistence / URL state.** The current date, selection and view are not
  encoded in the URL, so a particular moment can’t yet be deep‑linked or shared.
- **Single light‑on‑parchment theme.** Per the brief’s “one polished theme over two
  unfinished ones,” a dark map theme is not shipped (the UI chrome is dark; the map
  is not).
- **Desktop‑first.** The layout adapts to tablet widths, but small‑phone ergonomics
  (very dense timelines, overlapping labels) are not fully optimised.

## Accessibility caveats

- The map itself is a canvas; the accessible path is the **visible‑entities list**
  (☰), keyboard controls, ARIA‑labelled controls and live‑region date announcements.
  Screen‑reader users get a textual model of what’s visible, but not a spatial one.
- Colour is always paired with a non‑colour cue (hatch, dash, italic/caps, list), but
  the sheer number of muted territory colours at once can still be hard to
  distinguish for some users at a glance.
