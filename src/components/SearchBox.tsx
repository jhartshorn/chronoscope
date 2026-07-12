import { useEffect, useRef, useState } from 'react';
import { search, type SearchResult } from '../data';
import { formatDate } from '../history/date';

interface Props {
  onPickEntity: (id: string) => void;
  onPickEvent: (id: string) => void;
}

export function SearchBox({ onPickEntity, onPickEvent }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(search(query));
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const pick = (r: SearchResult) => {
    if (r.kind === 'entity') onPickEntity(r.entity.id);
    else onPickEvent(r.event.id);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="search" ref={boxRef}>
      <input
        type="search"
        value={query}
        placeholder="Search peoples, states, empires, events…"
        aria-label="Search historical entities and events"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="search-listbox"
        aria-activedescendant={open ? `search-opt-${active}` : undefined}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && results.length > 0 && (
        <ul className="search-results" id="search-listbox" role="listbox">
          {results.map((r, i) => {
            const title = r.kind === 'entity' ? r.entity.name : r.event.title;
            const meta =
              r.kind === 'entity'
                ? `${r.entity.category} · ${formatDate(r.entity.start, { months: false })}`
                : `event · ${formatDate(r.event.date, { months: false })}`;
            return (
              <li key={`${r.kind}-${title}`} role="option" id={`search-opt-${i}`} aria-selected={i === active}>
                <button onMouseEnter={() => setActive(i)} onClick={() => pick(r)}>
                  <span className="r-title">{title}</span>
                  <span className="r-meta">{meta}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
