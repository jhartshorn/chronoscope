import { useCallback, useEffect, useRef, useState } from 'react';
import { MapView } from './components/MapView';
import { Timeline } from './components/Timeline';
import { InfoPanel } from './components/InfoPanel';
import { EventPanel } from './components/EventPanel';
import { SearchBox } from './components/SearchBox';
import { Legend } from './components/Legend';
import { VisibleList } from './components/VisibleList';
import { PerfOverlay } from './components/PerfOverlay';
import { MethodologyModal } from './components/MethodologyModal';
import { PlaybackEngine } from './animation/playback';
import { timeStore } from './animation/timeStore';
import { ENTITY_BY_ID, EVENT_BY_ID, EVENTS } from './data';
import { dateToSliderPosition } from './history/timescale';
import { resolveGeometry } from './map/basemap';
import { snapshotPair } from './history/engine';
import type { MapRenderer } from './map/renderer';
import type { HistoricalEntity, HistoricalEvent } from './types';

export default function App() {
  const engineRef = useRef<PlaybackEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new PlaybackEngine(timeStore);
    engineRef.current.setMajorEvents(EVENTS);
    // Open on a legible early-antiquity scene rather than the void of deep prehistory.
    timeStore.setPosition(dateToSliderPosition({ year: -3000 }));
  }
  const engine = engineRef.current;

  const [renderer, setRenderer] = useState<MapRenderer | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<HistoricalEntity | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showVisibleList, setShowVisibleList] = useState(false);
  const [showPerf, setShowPerf] = useState(false);

  const selectEntity = useCallback(
    (id: string) => {
      const e = ENTITY_BY_ID.get(id);
      if (!e) return;
      setSelectedEvent(null);
      setSelectedEntity(e);
    },
    [],
  );

  const selectEvent = useCallback((id: string) => {
    const ev = EVENT_BY_ID.get(id);
    if (!ev) return;
    setSelectedEntity(null);
    setSelectedEvent(ev);
  }, []);

  // Jump the timeline + camera to an entity when picked from search.
  const gotoEntity = useCallback(
    (id: string) => {
      const e = ENTITY_BY_ID.get(id);
      if (!e || !renderer) return selectEntity(id);
      const mid = { year: (e.start.year + e.end.year) / 2 };
      timeStore.setPosition(dateToSliderPosition(mid));
      engine.pause();
      const { from } = snapshotPair(e, mid);
      renderer.focusGeometry(resolveGeometry(from.geometry));
      selectEntity(id);
    },
    [renderer, engine, selectEntity],
  );

  const gotoEvent = useCallback(
    (id: string) => {
      const ev = EVENT_BY_ID.get(id);
      if (!ev) return;
      timeStore.setPosition(dateToSliderPosition(ev.date));
      engine.pause();
      renderer?.focusPoint(ev.location.longitude, ev.location.latitude, 4);
      selectEvent(id);
    },
    [renderer, engine, selectEvent],
  );

  const focusEventOnMap = useCallback(
    (ev: HistoricalEvent) => {
      renderer?.focusPoint(ev.location.longitude, ev.location.latitude, 5);
    },
    [renderer],
  );

  // Test/automation hook: jump to a CE/BCE year (BCE negative). Dev + e2e only.
  useEffect(() => {
    const w = window as unknown as {
      __setYear?: (y: number) => void;
      __focus?: (lon: number, lat: number, zoom?: number) => void;
    };
    w.__setYear = (y: number) => {
      timeStore.setPosition(dateToSliderPosition({ year: y }));
      engine.pause();
    };
    w.__focus = (lon: number, lat: number, zoom = 6) => renderer?.focusPoint(lon, lat, zoom);
  }, [engine, renderer]);

  // Global keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (typing) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          engine.toggle();
          break;
        case 'ArrowLeft':
          if (target.getAttribute('role') === 'slider') return;
          e.preventDefault();
          timeStore.setPosition(timeStore.getPosition() - (e.shiftKey ? 0.02 : 0.005));
          engine.notifyScrubbed();
          break;
        case 'ArrowRight':
          if (target.getAttribute('role') === 'slider') return;
          e.preventDefault();
          timeStore.setPosition(timeStore.getPosition() + (e.shiftKey ? 0.02 : 0.005));
          engine.notifyScrubbed();
          break;
        case '+':
        case '=':
          engine.cycleSpeed(1);
          break;
        case '-':
        case '_':
          engine.cycleSpeed(-1);
          break;
        case 'r':
        case 'R':
          engine.restart();
          break;
        case 'l':
        case 'L':
          engine.setLoop(!engine.getState().loop);
          break;
        case 'Escape':
          setSelectedEntity(null);
          setSelectedEvent(null);
          break;
        case '?':
          setShowMethodology(true);
          break;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [engine]);

  // Toggle perf overlay with a hidden dev shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        setShowPerf((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="app">
      <a href="#timeline" className="skip-link">
        Skip to timeline controls
      </a>

      <main id="main">
        <MapView
          onEntityClick={(e) => {
            setSelectedEvent(null);
            setSelectedEntity(e);
          }}
          onEventClick={(e) => {
            setSelectedEntity(null);
            setSelectedEvent(e);
          }}
          selectedEntityId={selectedEntity?.id ?? null}
          registerRenderer={setRenderer}
        />
      </main>

      <div className="top-bar">
        <div className="brand">
          <h1>Chronoscope</h1>
          <p>A map of human history · 300,000 BCE – present</p>
        </div>
        <div className="top-spacer" />
        <SearchBox onPickEntity={gotoEntity} onPickEvent={gotoEvent} />
        <button
          className="icon-btn"
          onClick={() => setShowVisibleList((v) => !v)}
          title="List visible entities and events"
          aria-label="Toggle visible list"
          aria-pressed={showVisibleList}
        >
          ☰
        </button>
        <button
          className="icon-btn"
          onClick={() => setShowMethodology(true)}
          title="Methodology & uncertainty (?)"
          aria-label="Open methodology"
        >
          ⓘ
        </button>
      </div>

      <div className="zoom-controls">
        <button className="icon-btn" onClick={() => renderer?.zoomIn()} aria-label="Zoom in" title="Zoom in">
          +
        </button>
        <button className="icon-btn" onClick={() => renderer?.zoomOut()} aria-label="Zoom out" title="Zoom out">
          −
        </button>
        <button
          className="icon-btn"
          onClick={() => renderer?.resetView()}
          aria-label="Reset to world view"
          title="Reset to world view"
        >
          ⤢
        </button>
      </div>

      <Legend renderer={renderer} />

      {showVisibleList && (
        <VisibleList
          renderer={renderer}
          onSelectEntity={selectEntity}
          onSelectEvent={selectEvent}
          onClose={() => setShowVisibleList(false)}
        />
      )}

      {selectedEntity && (
        <InfoPanel
          entity={selectedEntity}
          onClose={() => setSelectedEntity(null)}
          onSelectEntity={selectEntity}
          onSelectEvent={selectEvent}
        />
      )}
      {selectedEvent && (
        <EventPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onFocus={focusEventOnMap}
        />
      )}

      <div id="timeline">
        <Timeline engine={engine} />
      </div>

      {showPerf && <PerfOverlay renderer={renderer} />}
      {showMethodology && <MethodologyModal onClose={() => setShowMethodology(false)} />}

      {/* Screen-reader live region describing the current state. */}
      <div className="sr-only" aria-live="polite">
        {selectedEntity
          ? `Selected entity: ${selectedEntity.name}`
          : selectedEvent
            ? `Selected event: ${selectedEvent.title}`
            : ''}
      </div>
    </div>
  );
}
