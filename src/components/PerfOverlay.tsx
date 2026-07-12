import { useEffect, useState } from 'react';
import type { MapRenderer } from '../map/renderer';

interface Props {
  renderer: MapRenderer | null;
}

/** Development performance overlay: FPS, last frame time, active counts. */
export function PerfOverlay({ renderer }: Props) {
  const [stats, setStats] = useState({ fps: 0, frameMs: 0, entities: 0, events: 0, zoom: 1 });
  useEffect(() => {
    const id = setInterval(() => {
      if (!renderer) return;
      const sets = renderer.getActiveSets();
      setStats({
        fps: renderer.fps,
        frameMs: renderer.frameMs,
        entities: sets.entities.length,
        events: sets.events.length,
        zoom: renderer.view.k,
      });
    }, 250);
    return () => clearInterval(id);
  }, [renderer]);

  return (
    <div className="perf-overlay" aria-hidden="true">
      <div>fps: {stats.fps.toFixed(0)}</div>
      <div>frame: {stats.frameMs.toFixed(1)} ms</div>
      <div>entities: {stats.entities}</div>
      <div>events: {stats.events}</div>
      <div>zoom: {stats.zoom.toFixed(2)}×</div>
    </div>
  );
}
