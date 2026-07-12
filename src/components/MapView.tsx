import { useEffect, useRef, useState } from 'react';
import type { HistoricalEntity, HistoricalEvent } from '../types';
import { ENTITIES, EVENTS } from '../data';
import { MapRenderer, type HoverInfo } from '../map/renderer';
import { timeStore } from '../animation/timeStore';
import { formatDate } from '../history/date';
import { resolveGeometry } from '../map/basemap';

interface Props {
  onEntityClick: (e: HistoricalEntity) => void;
  onEventClick: (e: HistoricalEvent) => void;
  selectedEntityId: string | null;
  registerRenderer: (r: MapRenderer) => void;
}

export function MapView({ onEntityClick, onEventClick, selectedEntityId, registerRenderer }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<MapRenderer | null>(null);
  const [hover, setHover] = useState<HoverInfo>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new MapRenderer(timeStore, ENTITIES, EVENTS, {
      onHover: setHover,
      onEntityClick,
      onEventClick,
      onViewChange: () => {},
    });
    rendererRef.current = renderer;
    renderer.attach(canvas);
    registerRenderer(renderer);
    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.detach();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rendererRef.current?.setSelectedEntity(selectedEntityId);
  }, [selectedEntityId]);

  return (
    <>
      <canvas ref={canvasRef} className="map-canvas" role="img" aria-label="Interactive world history map" />
      {hover && <MapTooltip hover={hover} />}
    </>
  );
}

function MapTooltip({ hover }: { hover: HoverInfo }) {
  if (!hover) return null;
  let title = '';
  let sub = '';
  if (hover.type === 'entity') {
    title = hover.entity.name;
    sub = `${formatDate(hover.entity.start, { months: false })} – ${formatDate(hover.entity.end, { months: false })}`;
  } else if (hover.type === 'event') {
    title = hover.event.title;
    sub = formatDate(hover.event.date, { months: false });
  } else {
    title = `${hover.count} events`;
    sub = 'Zoom in to separate';
  }
  return (
    <div className="tooltip" style={{ left: hover.x, top: hover.y }} role="status">
      {title}
      <div className="t-sub">{sub}</div>
    </div>
  );
}

/** Compute a fit geometry for an entity's dominant snapshot near a date. */
export function entityFocusGeometry(entity: HistoricalEntity) {
  const mid = entity.snapshots[Math.floor(entity.snapshots.length / 2)];
  return resolveGeometry(mid.geometry);
}
