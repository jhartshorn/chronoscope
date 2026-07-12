import { useState } from 'react';
import { CATEGORY_COLOURS, CATEGORY_LABELS } from '../map/palette';
import type { EntityCategory } from '../types';

const SHOWN: EntityCategory[] = [
  'hominin-species',
  'archaeological-culture',
  'civilisation',
  'kingdom',
  'empire',
  'colonial-possession',
  'modern-state',
];

export function Legend() {
  const [open, setOpen] = useState(true);
  return (
    <div className="legend" aria-label="Map legend">
      <h2>Legend</h2>
      {open && (
        <>
          {SHOWN.map((cat) => (
            <div className="legend-row" key={cat}>
              <span className="legend-swatch" style={{ background: CATEGORY_COLOURS[cat] }} />
              <span>{CATEGORY_LABELS[cat]}</span>
            </div>
          ))}
          <div className="legend-row">
            <span
              className="legend-swatch"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #8a6d3b, #8a6d3b 2px, transparent 2px, transparent 4px)',
              }}
            />
            <span>Low confidence / disputed</span>
          </div>
          <div className="legend-row">
            <span
              className="legend-swatch"
              style={{ background: 'transparent', border: '1px dashed #d6c49c' }}
            />
            <span>Uncertain boundary (dashed)</span>
          </div>
          <div className="legend-note">
            Soft, low-opacity fills mark diffuse prehistoric ranges; crisp borders mark
            documented polities. All extents are approximate.
          </div>
        </>
      )}
      <button className="collapse" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide legend ▲' : 'Show legend ▼'}
      </button>
    </div>
  );
}
