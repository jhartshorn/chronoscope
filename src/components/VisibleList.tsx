import { useEffect, useState } from 'react';
import type { MapRenderer } from '../map/renderer';
import { CATEGORY_COLOURS, EVENT_CATEGORY_COLOURS } from '../map/palette';
import { formatDate } from '../history/date';
import { timeStore } from '../animation/timeStore';
import { useSliderPosition } from '../hooks';

interface Props {
  renderer: MapRenderer | null;
  onSelectEntity: (id: string) => void;
  onSelectEvent: (id: string) => void;
  onClose: () => void;
}

/**
 * A textual, screen-reader-friendly list of everything currently visible on
 * the map — an accessible alternative to reading the canvas.
 */
export function VisibleList({ renderer, onSelectEntity, onSelectEvent, onClose }: Props) {
  const position = useSliderPosition(); // re-render as time changes
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 400);
    return () => clearInterval(id);
  }, []);

  const sets = renderer?.getActiveSets() ?? { entities: [], events: [] };
  const date = timeStore.getDate();
  void position;

  const entities = [...sets.entities].sort(
    (a, b) => (b.entity.labelImportance ?? 3) - (a.entity.labelImportance ?? 3),
  );
  const events = [...sets.events].sort((a, b) => b.event.importance - a.event.importance);

  return (
    <aside className="visible-list" role="region" aria-label="Currently visible on the map">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Visible at {formatDate(date)}</h2>
        <button className="panel-close" onClick={onClose} aria-label="Close list" style={{ marginRight: 8 }}>
          ×
        </button>
      </div>
      <h2 style={{ opacity: 0.5, marginTop: 4 }}>Entities ({entities.length})</h2>
      {entities.length === 0 && <p style={{ padding: '0 10px', opacity: 0.6, fontSize: 13 }}>None</p>}
      {entities.map((a) => (
        <button key={a.entity.id} onClick={() => onSelectEntity(a.entity.id)}>
          <span
            className="dot"
            style={{ background: a.entity.colour ?? CATEGORY_COLOURS[a.entity.category] }}
          />
          <span>
            {a.entity.name}
            <span style={{ opacity: 0.5, fontSize: 11 }}> · {a.entity.category}</span>
          </span>
        </button>
      ))}
      <h2 style={{ opacity: 0.5 }}>Events ({events.length})</h2>
      {events.length === 0 && <p style={{ padding: '0 10px', opacity: 0.6, fontSize: 13 }}>None</p>}
      {events.map((a) => (
        <button key={a.event.id} onClick={() => onSelectEvent(a.event.id)}>
          <span
            className="dot"
            style={{ background: EVENT_CATEGORY_COLOURS[a.event.category] ?? '#888' }}
          />
          <span>
            {a.event.title}
            <span style={{ opacity: 0.5, fontSize: 11 }}> · {formatDate(a.event.date, { months: false })}</span>
          </span>
        </button>
      ))}
    </aside>
  );
}
