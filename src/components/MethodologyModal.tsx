import { useEffect, useRef } from 'react';

interface Props {
  onClose: () => void;
}

export function MethodologyModal({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Methodology and uncertainty"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2>Methodology &amp; Uncertainty</h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Chronoscope is an interpretive teaching tool, not an authoritative atlas.</strong>{' '}
            It shows one reasonable reading of the geographical history of humanity so that the
            broad shape of the human past can be explored in motion. Every boundary is approximate.
          </p>

          <h3>How dates were chosen</h3>
          <p>
            Dates are stored as a single continuous number using the astronomical convention
            (year 0 = 1 BCE), so the timeline spans from about 300,000 BCE to the present without
            relying on the JavaScript <code>Date</code> object. There is deliberately no displayed
            “year zero”: astronomical year 0 is shown as 1 BCE. Deep-prehistoric dates are rounded
            to honest magnitudes (e.g. “250,000 BCE”), because false precision there would mislead.
            Where a traditional or legendary date exists, it is treated as such rather than as
            established fact.
          </p>

          <h3>The non-linear timeline</h3>
          <p>
            A linear scale would compress all of recorded history into the last sliver of the
            slider. Instead the slider maps to “years before present” through a smooth logarithmic
            curve, so a given slider movement covers tens of millennia in deep prehistory but only
            a few years near the present. The mapping is strictly monotonic and exactly invertible.
          </p>

          <h3>How territorial extents were interpreted</h3>
          <p>
            Historic polygons are hand-drawn, coarse approximations based on the cited scholarship —
            not survey data. Modern states reuse public-domain Natural Earth coastlines so their
            outlines are accurate. Fills are clipped to the coastline so the sea always reads
            clearly, even where an approximate polygon overshoots.
          </p>

          <h3>How uncertainty is rendered</h3>
          <ul>
            <li>Diffuse peoples, cultures and hominin species use soft, low-opacity fills and blurred edges rather than crisp borders.</li>
            <li>Documented polities use clearer fills and thin borders that sharpen as you zoom in.</li>
            <li>Low-confidence areas are additionally hatched — a signal that does not rely on colour.</li>
            <li>Uncertain boundaries are drawn with dashed strokes; medium and low confidence use different dash patterns.</li>
            <li>Approximate event locations are marked with a dashed ring and noted in the panel.</li>
          </ul>

          <h3>Why entities overlap</h3>
          <p>
            History is not a partition of the map into non-overlapping states. A people, an
            archaeological culture, an empire and a modern nation can all describe the same ground
            at different levels of analysis, and claims frequently overlapped. Chronoscope layers
            entities with a visual hierarchy (diffuse ranges beneath polities, larger beneath
            smaller) instead of pretending one polygon is the whole truth.
          </p>

          <h3>Continuity is not identity</h3>
          <p>
            That one entity occupies ground later held by another does <em>not</em> imply ethnic,
            linguistic, cultural or political continuity between them. Chronoscope avoids projecting
            modern national identities backwards, and keeps wording politically neutral. Disputed
            modern frontiers are noted as such.
          </p>

          <h3>Confidence ratings</h3>
          <table>
            <thead>
              <tr>
                <th>Rating</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High</td>
                <td>Well-documented modern boundary (e.g. Natural Earth country outlines).</td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>Reasonable scholarly reconstruction, but the exact line is debatable.</td>
              </tr>
              <tr>
                <td>Low</td>
                <td>Broad, schematic range — especially prehistoric distributions inferred from scattered finds.</td>
              </tr>
            </tbody>
          </table>

          <p style={{ opacity: 0.7, marginTop: 20 }}>
            Basemap: Natural Earth (public domain) via the <code>world-atlas</code> package.
            Full source citations appear in each entity and event panel and in the project README.
          </p>
        </div>
      </div>
    </div>
  );
}
