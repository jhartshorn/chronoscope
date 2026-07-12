import { useEffect, useRef } from 'react';
import type { HistoricalEntity } from '../types';
import { ENTITY_BY_ID, EVENTS } from '../data';
import { CATEGORY_COLOURS, CATEGORY_LABELS } from '../map/palette';
import { formatDate, formatRange } from '../history/date';
import { snapshotPair } from '../history/engine';
import { timeStore } from '../animation/timeStore';

interface Props {
  entity: HistoricalEntity;
  onClose: () => void;
  onSelectEntity: (id: string) => void;
  onSelectEvent: (id: string) => void;
}

export function InfoPanel({ entity, onClose, onSelectEntity, onSelectEvent }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, [entity.id]);

  const colour = entity.colour ?? CATEGORY_COLOURS[entity.category];
  const { from } = snapshotPair(entity, timeStore.getDate());
  const relatedEvents = EVENTS.filter((ev) => {
    const y = ev.date.year;
    return y >= entity.start.year - 200 && y <= entity.end.year + 200 && eventNear(ev, entity);
  }).slice(0, 4);

  return (
    <aside className="info-panel" role="dialog" aria-label={`Details: ${entity.name}`}>
      <div className="panel-head">
        <div>
          <h2>{entity.name}</h2>
          <span className="panel-cat" style={{ color: colour }}>
            {CATEGORY_LABELS[entity.category]}
          </span>
        </div>
        <button className="panel-close" ref={closeRef} onClick={onClose} aria-label="Close panel">
          ×
        </button>
      </div>
      <div className="panel-body">
        {entity.alternativeNames && entity.alternativeNames.length > 0 && (
          <div className="panel-field">
            <div className="k">Also known as</div>
            <div className="v">{entity.alternativeNames.join(', ')}</div>
          </div>
        )}

        <div className="panel-field">
          <div className="k">Date range</div>
          <div className="v">{formatRange(entity.start, entity.end)}</div>
        </div>

        {entity.description && <p>{entity.description}</p>}

        <div className="panel-field">
          <div className="k">Current territorial snapshot</div>
          <div className="v">
            {formatDate(from.date, { months: false })}
            {from.notes ? ` — ${from.notes}` : ''}
          </div>
        </div>

        <div className="panel-field">
          <div className="k">Confidence</div>
          <div className="v">
            <span className={`confidence-pill confidence-${entity.confidence}`}>
              <ConfidenceIcon level={entity.confidence} /> {entity.confidence}
            </span>
          </div>
        </div>

        {renderRelations('Preceded by', entity.predecessorIds, onSelectEntity)}
        {renderRelations('Succeeded by', entity.successorIds, onSelectEntity)}

        {relatedEvents.length > 0 && (
          <div className="panel-field">
            <div className="k">Related events</div>
            <div>
              {relatedEvents.map((ev) => (
                <button key={ev.id} className="chip" onClick={() => onSelectEvent(ev.id)}>
                  {ev.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="panel-field">
          <div className="k">Sources</div>
          <ul className="sources">
            {entity.sources.map((s, i) => (
              <li key={i}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.citation}
                  </a>
                ) : (
                  s.citation
                )}
                {s.note ? ` — ${s.note}` : ''}
              </li>
            ))}
          </ul>
        </div>

        <div className="disclaimer">
          Territorial extents shown are approximate historical interpretations, not exact facts.
          Continuity of territory does not imply ethnic, linguistic or political continuity.
        </div>
      </div>
    </aside>
  );
}

function renderRelations(
  label: string,
  ids: string[] | undefined,
  onSelect: (id: string) => void,
) {
  if (!ids || ids.length === 0) return null;
  const valid = ids.map((id) => ENTITY_BY_ID.get(id)).filter(Boolean) as HistoricalEntity[];
  if (valid.length === 0) return null;
  return (
    <div className="panel-field">
      <div className="k">{label}</div>
      <div>
        {valid.map((e) => (
          <button key={e.id} className="chip" onClick={() => onSelect(e.id)}>
            {e.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function eventNear(
  ev: { location: { latitude: number; longitude: number } },
  _entity: HistoricalEntity,
): boolean {
  // Coarse geographic relevance: keep it simple and permissive.
  return Math.abs(ev.location.latitude) <= 90;
}

export function ConfidenceIcon({ level }: { level: 'high' | 'medium' | 'low' }) {
  const glyph = level === 'high' ? '●' : level === 'medium' ? '◐' : '○';
  return <span aria-hidden="true">{glyph}</span>;
}
