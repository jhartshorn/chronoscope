import { useEffect, useState } from 'react';
import { CATEGORY_COLOURS, CATEGORY_LABELS } from '../map/palette';
import { ENTITY_LAYERS, EVENTS_LAYER_ID, hiddenCategoriesFor } from '../map/layers';
import type { MapRenderer } from '../map/renderer';
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

interface Props {
  renderer: MapRenderer | null;
}

export function Legend({ renderer }: Props) {
  const [open, setOpen] = useState(true);
  const [layersOpen, setLayersOpen] = useState(false);
  const [hiddenLayers, setHiddenLayers] = useState<ReadonlySet<string>>(() => new Set());

  // Push layer visibility to the renderer (which may attach after mount).
  useEffect(() => {
    renderer?.setLayerVisibility(hiddenCategoriesFor(hiddenLayers), hiddenLayers.has(EVENTS_LAYER_ID));
  }, [renderer, hiddenLayers]);

  const toggleLayer = (id: string) => {
    setHiddenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

          {layersOpen && (
            <div className="legend-layers" role="group" aria-label="Map layers">
              <h3>Layers</h3>
              {ENTITY_LAYERS.map((layer) => (
                <label className="layer-row" key={layer.id}>
                  <input
                    type="checkbox"
                    checked={!hiddenLayers.has(layer.id)}
                    onChange={() => toggleLayer(layer.id)}
                  />
                  <span>{layer.label}</span>
                </label>
              ))}
              <label className="layer-row">
                <input
                  type="checkbox"
                  checked={!hiddenLayers.has(EVENTS_LAYER_ID)}
                  onChange={() => toggleLayer(EVENTS_LAYER_ID)}
                />
                <span>Events</span>
              </label>
            </div>
          )}
          <button
            className="collapse"
            onClick={() => setLayersOpen((o) => !o)}
            aria-expanded={layersOpen}
          >
            {layersOpen ? 'Hide layers ▲' : 'Layers ▼'}
          </button>
        </>
      )}
      <button className="collapse" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide legend ▲' : 'Show legend ▼'}
      </button>
    </div>
  );
}
