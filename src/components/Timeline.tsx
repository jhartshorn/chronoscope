import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { timeStore } from '../animation/timeStore';
import type { PlaybackEngine } from '../animation/playback';
import { PLAYBACK_SPEEDS } from '../animation/playback';
import { usePlaybackState, useSliderPosition } from '../hooks';
import { FULL_RANGE, generateTicks, periodTickRange } from '../history/timescale';
import { formatDate, formatRange, hd } from '../history/date';
import { dateToSliderPosition } from '../history/timescale';
import { PERIODS, periodEndYear } from '../history/periods';
import { EVENTS } from '../data';
import type { HistoricalDate } from '../types';

function eraTag(date: HistoricalDate): string {
  const y = date.year;
  if (y < -10000) return 'Palaeolithic';
  if (y < -3200) return 'Neolithic';
  if (y < -800) return 'Bronze Age';
  if (y < 500) return 'Antiquity';
  if (y < 1500) return 'Medieval';
  if (y < 1800) return 'Early Modern';
  return 'Modern';
}

interface Props {
  engine: PlaybackEngine;
}

export function Timeline({ engine }: Props) {
  const position = useSliderPosition();
  const playback = usePlaybackState(engine);
  const date = timeStore.getDate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);
  const [dragging, setDragging] = useState(false);
  // Playback controls collapse behind a toggle. Open by default on desktop,
  // collapsed on narrow screens (phones) to keep the bar uncluttered and give
  // the date read-out room.
  const [controlsOpen, setControlsOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth > 720,
  );
  // Period-focus control: hidden behind a toggle, closed by default.
  const [periodControlOpen, setPeriodControlOpen] = useState(false);
  const [focusedPeriodId, setFocusedPeriodId] = useState<string | null>(null);
  const focusedPeriod = focusedPeriodId ? PERIODS.find((p) => p.id === focusedPeriodId) ?? null : null;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // When focused, the whole bar windows onto [period start, period end]
  // instead of the full timeline — ticks, handle, fill and markers all read
  // through this range rather than the raw global slider position.
  const range = useMemo(
    () => (focusedPeriod ? periodTickRange(focusedPeriod.startYear, periodEndYear(focusedPeriod)) : FULL_RANGE),
    [focusedPeriod],
  );

  const ticks = useMemo(() => generateTicks(width, 90, range), [width, range]);

  // Major-event markers on the slider (importance >= 4).
  const eventMarkers = useMemo(
    () =>
      EVENTS.filter((e) => e.importance >= 4)
        .map((e) => ({ id: e.id, pos: range.toView(dateToSliderPosition(e.date)) }))
        .filter((m) => m.pos >= 0 && m.pos <= 1),
    [range],
  );

  const displayPosition = Math.min(1, Math.max(0, range.toView(position)));

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = (clientX - rect.left) / rect.width;
    timeStore.setPosition(range.toGlobal(Math.min(1, Math.max(0, p))));
    engine.notifyScrubbed();
  }, [engine, range]);

  const selectPeriod = useCallback(
    (id: string) => {
      if (!id) {
        setFocusedPeriodId(null);
        return;
      }
      const period = PERIODS.find((p) => p.id === id);
      if (!period) return;
      setFocusedPeriodId(id);
      timeStore.setPosition(dateToSliderPosition(hd(period.startYear)));
      engine.notifyScrubbed();
    },
    [engine],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    // Never let a scrub start a browser text/element selection (which would
    // highlight the whole map canvas if the drag strays off the slider).
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Keyboard controls on the slider itself. Step size is relative to the
  // *visible* bar (range.scale === 1 for the full timeline), so arrow keys
  // feel the same whether or not a period is focused.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = (e.shiftKey ? 0.02 : 0.005) * range.scale;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        timeStore.setPosition(position - step);
        engine.notifyScrubbed();
        break;
      case 'ArrowRight':
        e.preventDefault();
        timeStore.setPosition(position + step);
        engine.notifyScrubbed();
        break;
      case 'Home':
        e.preventDefault();
        timeStore.setPosition(range.toGlobal(0));
        engine.notifyScrubbed();
        break;
      case 'End':
        e.preventDefault();
        timeStore.setPosition(range.toGlobal(1));
        engine.notifyScrubbed();
        break;
    }
  };

  // Collapsed controls must not be keyboard-focusable.
  const ctlTab = controlsOpen ? undefined : -1;
  const periodTab = periodControlOpen ? undefined : -1;

  return (
    <section className="timeline" aria-label="Timeline controls">
      <div className="timeline-bar">
        <button
          className={`controls-toggle${controlsOpen ? ' open' : ''}`}
          onClick={() => setControlsOpen((o) => !o)}
          aria-expanded={controlsOpen}
          aria-controls="playback-controls"
          title={controlsOpen ? 'Hide speed & loop controls' : 'Show speed & loop controls'}
          aria-label={controlsOpen ? 'Hide speed and loop controls' : 'Show speed and loop controls'}
        >
          <span aria-hidden="true">⚙</span>
        </button>

        <button
          className={`controls-toggle${periodControlOpen ? ' open' : ''}${focusedPeriod ? ' active' : ''}`}
          onClick={() => setPeriodControlOpen((o) => !o)}
          aria-expanded={periodControlOpen}
          aria-controls="period-focus-control"
          title={periodControlOpen ? 'Hide period focus' : 'Focus a time period'}
          aria-label={periodControlOpen ? 'Hide period focus control' : 'Show period focus control'}
        >
          <span aria-hidden="true">⌖</span>
        </button>

        <button
          className="play-btn"
          onClick={() => engine.toggle()}
          title={playback.playing ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={playback.playing ? 'Pause' : 'Play'}
          aria-pressed={playback.playing}
        >
          {playback.playing ? '❚❚' : '▶'}
        </button>

        <div className="date-display" aria-live="polite" aria-atomic="true">
          <span className="date-value">{formatDate(date)}</span>
          <span className="era-tag">{eraTag(date)}</span>
        </div>
      </div>

      <div
        id="playback-controls"
        className={`playback-controls${controlsOpen ? ' open' : ''}`}
        role="group"
        aria-label="Playback options"
        aria-hidden={!controlsOpen}
      >
        <button
          className="icon-btn"
          style={{ width: 38, height: 38 }}
          onClick={() => engine.restart()}
          title="Restart to 300,000 BCE (R)"
          aria-label="Restart timeline"
          tabIndex={ctlTab}
        >
          ⟲
        </button>

        <div className="speed-group" role="group" aria-label="Playback speed">
          {PLAYBACK_SPEEDS.map((s) => (
            <button
              key={s}
              className={s === playback.speed ? 'active' : ''}
              onClick={() => engine.setSpeed(s)}
              aria-pressed={s === playback.speed}
              aria-label={`Speed ${s} times`}
              tabIndex={ctlTab}
            >
              {s}×
            </button>
          ))}
        </div>

        <div className="toggles">
          <label className="toggle" title="Loop playback">
            <input
              type="checkbox"
              checked={playback.loop}
              onChange={(e) => engine.setLoop(e.target.checked)}
              tabIndex={ctlTab}
            />
            Loop
          </label>
          <label className="toggle" title="Pause briefly at major events">
            <input
              type="checkbox"
              checked={playback.pauseAtMajorEvents}
              onChange={(e) => engine.setPauseAtMajorEvents(e.target.checked)}
              tabIndex={ctlTab}
            />
            Dwell
          </label>
        </div>
      </div>

      <div
        id="period-focus-control"
        className={`period-focus${periodControlOpen ? ' open' : ''}`}
        role="group"
        aria-label="Focus a time period"
        aria-hidden={!periodControlOpen}
      >
        <label className="period-focus-label" htmlFor="period-select">
          Focus era
        </label>
        <select
          id="period-select"
          value={focusedPeriodId ?? ''}
          onChange={(e) => selectPeriod(e.target.value)}
          tabIndex={periodTab}
        >
          <option value="">Full timeline</option>
          {PERIODS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        {focusedPeriod && (
          <button
            className="icon-btn"
            style={{ width: 32, height: 32, fontSize: 14 }}
            onClick={() => selectPeriod('')}
            title="Show the full timeline"
            aria-label="Clear period focus"
            tabIndex={periodTab}
          >
            ✕
          </button>
        )}
      </div>

      {/* Redundant with the open "Focus era" select, which already shows the
          selection — only surface the chip while that panel is collapsed. In
          normal document flow (not floated over the slider) so it can never
          overlap the playback-controls row above it, open or closed. */}
      {focusedPeriod && !periodControlOpen && (
        <div className="focus-flag" aria-live="polite">
          Focused: {focusedPeriod.label} ({formatRange(hd(focusedPeriod.startYear), hd(periodEndYear(focusedPeriod)))})
        </div>
      )}

      <div className={`slider${focusedPeriod ? ' focused' : ''}`}>
        {playback.dwelling && <div className="dwell-flag">Pausing at a major event…</div>}
        <div
          className="slider-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
        <div className="slider-fill" style={{ width: `${displayPosition * 100}%` }} />

        {eventMarkers.map((m) => (
          <div
            key={m.id}
            className="slider-event-marker"
            style={{ left: `${m.pos * 100}%` }}
            aria-hidden="true"
          />
        ))}

        {ticks.map((t, i) => (
          <div key={i} aria-hidden="true">
            <div
              className={`slider-tick ${t.major ? 'major' : ''}`}
              style={{ left: `${t.position * 100}%`, height: t.major ? 8 : 5 }}
            />
            <div className="slider-tick-label" style={{ left: `${t.position * 100}%` }}>
              {t.label}
            </div>
          </div>
        ))}

        <div
          className="slider-handle"
          style={{ left: `${displayPosition * 100}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Historical date"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(displayPosition * 100)}
          aria-valuetext={formatDate(date)}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>
    </section>
  );
}
