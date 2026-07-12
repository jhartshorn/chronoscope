# Methodology & uncertainty

*This is the written companion to the in‑app **ⓘ Methodology** page. It explains how
Chronoscope makes its choices and, more importantly, where it is uncertain.*

**Chronoscope is an interpretive teaching tool, not an authoritative atlas.** It
presents *one reasonable reading* of the geographical history of humanity so that
the broad shape of the human past can be explored in motion. Every boundary is
approximate.

## How dates were chosen

Dates are stored as a single continuous number using the astronomical convention
(year 0 = 1 BCE), so the timeline spans ~300,000 BCE to the present without relying
on JavaScript’s `Date` object. **There is no displayed year zero**: astronomical
year 0 renders as 1 BCE. Deep‑prehistoric dates are rounded to honest magnitudes
(“250,000 BCE”), because false precision there would mislead. Where only a
traditional or legendary date exists (e.g. the life of the Buddha), it is treated as
approximate and flagged, not presented as established fact.

## The non‑linear timeline

A linear scale would compress all of recorded history into the final sliver of the
slider. Instead the slider maps to “years before present” through one smooth
logarithmic curve, so equal slider movements cover tens of millennia in deep
prehistory but only a few years near the present. The mapping is strictly monotonic
and exactly invertible (`sliderPositionToDate` ∘ `dateToSliderPosition` = identity
to ~1e‑6). This supports very large jumps in deep prehistory, millennia in later
prehistory, centuries in antiquity/medieval, decades in the early modern period, and
years or months in recent history — without any abrupt seam between regimes.

## How territorial extents were interpreted

Historic polygons are **hand‑drawn, coarse approximations** based on the cited
scholarship — not survey data. They capture the broad shape and rough reach of an
entity at a given date, not a surveyed border. Modern states reuse public‑domain
Natural Earth coastlines, so their outlines are accurate even though their
*inclusion* and dating remain an editorial choice. All territory fills are clipped
to the coastline, so the sea always reads clearly even where an approximate polygon
overshoots the land.

## How uncertainty is rendered

Uncertainty is built into the visual language, not hidden:

- **Diffuse peoples, cultures and hominin species** use soft, low‑opacity fills with
  blurred (haloed) edges instead of crisp borders — they are ranges of inferred
  presence, not territories.
- **Documented polities** use clearer fills and thin borders that sharpen as you
  zoom in.
- **Low‑confidence areas** are additionally **hatched** — a signal that does not rely
  on colour, for accessibility.
- **Uncertain boundaries** use dashed strokes, with different dash patterns for
  medium vs low confidence.
- **Approximate event locations** are drawn with a dashed ring and labelled
  “(approximate)” in the panel.
- Every entity and snapshot carries an explicit `confidence` rating, shown in the
  information panel.

| Rating | Meaning |
| --- | --- |
| High | Well‑documented modern boundary (e.g. Natural Earth country outlines). |
| Medium | Reasonable scholarly reconstruction; the exact line is debatable. |
| Low | Broad, schematic range — especially prehistoric distributions inferred from scattered finds. |

## Why entities overlap

History is not a partition of the map into non‑overlapping states. A people, an
archaeological culture, an empire and a later nation can all describe the same ground
at different levels of analysis, and political claims frequently overlapped in
reality. Chronoscope therefore layers entities with a deliberate **visual
hierarchy** — diffuse ranges beneath polities, larger territories beneath smaller —
and blends by opacity, rather than letting whichever polygon is drawn last obscure
everything beneath it. Hit‑testing returns the *smallest* territory under the cursor,
so enclaves stay clickable under sprawling empires.

## Archaeological cultures are not ethnic identities

A shared pottery style or toolkit (an “archaeological culture”) is a pattern in
material remains. It does **not** straightforwardly correspond to a people, a
language, or an ethnic identity. Chronoscope keeps the `archaeological-culture`
category visually distinct from `people` and from political categories, and describes
them as material‑culture distributions.

## Continuity is not identity

That one entity occupies ground later held by another does **not** imply ethnic,
linguistic, cultural or political continuity between them. Chronoscope avoids
projecting modern national identities backwards onto ancient polities, keeps wording
politically neutral, and notes where modern frontiers are disputed. The information
panel repeats this disclaimer for every entity.

## Avoiding myth‑as‑fact

Foundation legends, regnal traditions and round‑number “classic” dates are treated as
approximate or flagged as traditional, not asserted as precise events. Confidence
ratings and `notes` / `uncertainty` fields carry these caveats into the UI.

## Sources

The basemap is Natural Earth (public domain) via the `world-atlas` package. Every
historical entity and event carries explicit source citations (with URLs where
available), visible in its information panel and enumerable in the dataset. The
historical geometries are original interpretations drawn for this project.
