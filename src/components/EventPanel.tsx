import { useEffect, useRef } from 'react';
import type { HistoricalEvent } from '../types';
import { formatDate } from '../history/date';
import { EVENT_CATEGORY_COLOURS } from '../map/palette';

interface Props {
  event: HistoricalEvent;
  onClose: () => void;
  onFocus: (event: HistoricalEvent) => void;
}

export function EventPanel({ event, onClose, onFocus }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, [event.id]);

  const colour = EVENT_CATEGORY_COLOURS[event.category] ?? EVENT_CATEGORY_COLOURS.other;
  const loc = event.location;

  return (
    <aside className="info-panel" role="dialog" aria-label={`Event: ${event.title}`}>
      <div className="panel-head">
        <div>
          <h2>{event.title}</h2>
          <span className="panel-cat" style={{ color: colour }}>
            {event.category} · event
          </span>
        </div>
        <button className="panel-close" ref={closeRef} onClick={onClose} aria-label="Close panel">
          ×
        </button>
      </div>
      <div className="panel-body">
        <div className="panel-field">
          <div className="k">Date</div>
          <div className="v">
            {formatDate(event.date)}
            {event.endDate ? ` – ${formatDate(event.endDate)}` : ''}
          </div>
        </div>

        <div className="panel-field">
          <div className="k">Location</div>
          <div className="v">
            {loc.latitude.toFixed(1)}°, {loc.longitude.toFixed(1)}°{' '}
            {loc.approximate && <em style={{ opacity: 0.7 }}>(approximate)</em>}{' '}
            <button className="chip" onClick={() => onFocus(event)}>
              Show on map
            </button>
          </div>
        </div>

        <p>{event.description}</p>

        {event.uncertainty && (
          <div className="panel-field">
            <div className="k">Uncertainty</div>
            <div className="v">{event.uncertainty}</div>
          </div>
        )}

        <div className="panel-field">
          <div className="k">Importance</div>
          <div className="v">{'★'.repeat(event.importance)}{'☆'.repeat(5 - event.importance)}</div>
        </div>

        <div className="panel-field">
          <div className="k">Sources</div>
          <ul className="sources">
            {event.sources.map((s, i) => (
              <li key={i}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.citation}
                  </a>
                ) : (
                  s.citation
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="disclaimer">
          Event dates and locations are approximate historical interpretations. Traditional or
          legendary dates are given as such, not as established facts.
        </div>
      </div>
    </aside>
  );
}
