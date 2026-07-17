import { geoArea, geoContains, geoGraticule10, geoPath } from 'd3-geo';
import type { Geometry, MultiPolygon, Polygon } from 'geojson';
import type { ActiveEntity, ActiveEvent, Confidence, EntityCategory, HistoricalEntity, HistoricalEvent } from '../types';
import { ActiveSetCache } from '../history/engine';
import type { TimeStore } from '../animation/timeStore';
import { MapViewState } from './view';
import { ensureHighDetailLand, getLand, resolveGeometry } from './basemap';
import { placeLabels, type LabelInput } from './labels';
import {
  CATEGORY_COLOURS,
  CATEGORY_FILL_OPACITY,
  CONFIDENCE_EDGE,
  darken,
  DIFFUSE_CATEGORIES,
  EVENT_CATEGORY_COLOURS,
  hexToRgba,
  THEME,
} from './palette';

export interface EventCluster {
  x: number;
  y: number;
  events: ActiveEvent[];
  alpha: number;
}

export type HoverInfo =
  | { type: 'entity'; entity: HistoricalEntity; x: number; y: number }
  | { type: 'event'; event: HistoricalEvent; x: number; y: number }
  | { type: 'cluster'; count: number; x: number; y: number }
  | null;

export interface RendererCallbacks {
  onHover(info: HoverInfo): void;
  onEntityClick(entity: HistoricalEntity): void;
  onEventClick(event: HistoricalEvent): void;
  onViewChange(zoom: number): void;
}

interface CachedPath {
  version: number;
  path: Path2D;
}

/**
 * Canvas map renderer. Consumes the historical engine's ActiveEntity /
 * ActiveEvent sets and draws them with the atlas theme. Owns pan/zoom and
 * pointer interaction; publishes hover/click through callbacks.
 *
 * Performance model: geometry is projected into Path2D objects cached per
 * (geometry, view.version), so timeline playback with a static view costs
 * only fills/strokes — no re-projection. Redraws happen only when marked
 * dirty (time, view, hover, size, selection).
 */
export class MapRenderer {
  readonly view = new MapViewState();

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private dpr = 1;
  private dirty = true;
  private raf = 0;
  private unsubTime: (() => void) | null = null;

  private cache: ActiveSetCache;
  private pathCache = new WeakMap<object, CachedPath>();
  private areaCache = new WeakMap<object, number>();

  private hover: HoverInfo = null;
  private lastHoverTest = 0;
  private selectedEntityId: string | null = null;

  // Layer visibility: entity categories hidden by the user, plus the event
  // markers toggle. Filtering happens where the active set is queried, so
  // hit-testing, labels and the visible list all follow automatically.
  private hiddenCategories: ReadonlySet<EntityCategory> = new Set();
  private eventsHidden = false;

  private pointers = new Map<number, { x: number; y: number }>();
  private dragging = false;
  private dragMoved = 0;
  private pinchDist = 0;

  private viewAnim: { from: [number, number, number]; to: [number, number, number]; start: number; duration: number } | null = null;

  reducedMotion = false;
  private clusters: EventCluster[] = [];
  private lastActive: { entities: ActiveEntity[]; events: ActiveEvent[] } = { entities: [], events: [] };

  // Perf instrumentation (read by the debug overlay).
  frameMs = 0;
  fps = 0;
  private frameCount = 0;
  private fpsWindowStart = 0;

  constructor(
    private store: TimeStore,
    entities: HistoricalEntity[],
    events: HistoricalEvent[],
    private callbacks: RendererCallbacks,
  ) {
    this.cache = new ActiveSetCache(entities, events);
    this.reducedMotion =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.unsubTime = this.store.subscribe(() => this.markDirty());
    this.bindPointerEvents(canvas);
    this.resize();
    const loop = (now: number) => {
      this.step(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  detach() {
    cancelAnimationFrame(this.raf);
    this.unsubTime?.();
    this.canvas = null;
    this.ctx = null;
  }

  markDirty() {
    this.dirty = true;
  }

  setSelectedEntity(id: string | null) {
    this.selectedEntityId = id;
    this.markDirty();
  }

  setLayerVisibility(hiddenCategories: ReadonlySet<EntityCategory>, eventsHidden: boolean) {
    this.hiddenCategories = hiddenCategories;
    this.eventsHidden = eventsHidden;
    this.markDirty();
  }

  getActiveSets() {
    return this.lastActive;
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    this.view.resize(rect.width, rect.height);
    this.markDirty();
  }

  // ---------------------------------------------------------------- view ops

  zoomIn = () => this.animateZoom(1.6);
  zoomOut = () => this.animateZoom(1 / 1.6);

  private animateZoom(factor: number) {
    const { k, tx, ty } = this.view;
    const x = this.view.width / 2;
    const y = this.view.height / 2;
    const k2 = Math.min(this.view.maxZoom, Math.max(this.view.minZoom, k * factor));
    const f = k2 / k;
    this.animateTo(k2, x - (x - tx) * f, y - (y - ty) * f, 260);
  }

  resetView = () => {
    this.animateTo(1, 0, 0, 420);
  };

  focusGeometry(geometry: Geometry) {
    const t = this.view.fitGeometry(geometry);
    this.animateTo(t.k, t.tx, t.ty, 600);
  }

  focusPoint(lon: number, lat: number, zoom = 4) {
    const t = this.view.transformForPoint(lon, lat, zoom);
    this.animateTo(t.k, t.tx, t.ty, 600);
  }

  private animateTo(k: number, tx: number, ty: number, duration: number) {
    if (this.reducedMotion || duration <= 0) {
      this.view.setTransform(k, tx, ty);
      this.onViewChanged();
      return;
    }
    this.viewAnim = {
      from: [this.view.k, this.view.tx, this.view.ty],
      to: [k, tx, ty],
      start: performance.now(),
      duration,
    };
    this.markDirty();
  }

  private onViewChanged() {
    if (this.view.k > 2.5) ensureHighDetailLand(() => this.markDirty());
    this.callbacks.onViewChange(this.view.k);
    this.markDirty();
  }

  // ------------------------------------------------------------ interaction

  private bindPointerEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener('pointerdown', (e) => {
      canvas.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
      this.dragging = true;
      this.dragMoved = 0;
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      const prev = this.pointers.get(e.pointerId);
      if (this.dragging && prev) {
        const dx = e.offsetX - prev.x;
        const dy = e.offsetY - prev.y;
        this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
        this.dragMoved += Math.abs(dx) + Math.abs(dy);
        if (this.pointers.size === 2) {
          const [a, b] = [...this.pointers.values()];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const cx = (a.x + b.x) / 2;
          const cy = (a.y + b.y) / 2;
          if (this.pinchDist > 0) this.view.zoomBy(dist / this.pinchDist, cx, cy);
          this.pinchDist = dist;
          this.onViewChanged();
        } else if (this.dragMoved > 3) {
          this.view.panBy(dx, dy);
          this.onViewChanged();
        }
      } else {
        this.handleHover(e.offsetX, e.offsetY);
      }
    });

    const endPointer = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size === 0) {
        this.dragging = false;
        if (this.dragMoved < 5) this.handleClick(e.offsetX, e.offsetY);
      }
      this.pinchDist = 0;
    };
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('pointerleave', () => {
      if (!this.dragging) this.setHover(null);
    });

    canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const factor = Math.exp(-e.deltaY * 0.0015);
        this.view.zoomBy(factor, e.offsetX, e.offsetY);
        this.onViewChanged();
      },
      { passive: false },
    );

    canvas.addEventListener('dblclick', (e) => {
      this.view.zoomBy(1.8, e.offsetX, e.offsetY);
      this.onViewChanged();
    });
  }

  private setHover(info: HoverInfo) {
    const changed =
      (this.hover === null) !== (info === null) ||
      (this.hover &&
        info &&
        (this.hover.type !== info.type ||
          (this.hover.type === 'entity' && info.type === 'entity' && this.hover.entity.id !== info.entity.id) ||
          (this.hover.type === 'event' && info.type === 'event' && this.hover.event.id !== info.event.id)));
    this.hover = info;
    if (this.canvas) this.canvas.style.cursor = info ? 'pointer' : 'grab';
    if (changed) {
      this.callbacks.onHover(info);
      this.markDirty();
    } else if (info) {
      this.callbacks.onHover(info); // position update for tooltip
    }
  }

  private handleHover(x: number, y: number) {
    const now = performance.now();
    if (now - this.lastHoverTest < 40) return;
    this.lastHoverTest = now;
    this.setHover(this.hitTest(x, y));
  }

  private handleClick(x: number, y: number) {
    const hit = this.hitTest(x, y);
    if (!hit) {
      this.callbacks.onHover(null);
      return;
    }
    if (hit.type === 'event') this.callbacks.onEventClick(hit.event);
    else if (hit.type === 'cluster') this.view.zoomBy(2, x, y), this.onViewChanged();
    else this.callbacks.onEntityClick(hit.entity);
  }

  private hitTest(x: number, y: number): HoverInfo {
    // Events and clusters take priority (they are drawn on top).
    for (const c of this.clusters) {
      const r = c.events.length > 1 ? 15 : 6 + c.events[0].event.importance * 1.4;
      if (Math.hypot(c.x - x, c.y - y) <= r + 3) {
        if (c.events.length === 1) return { type: 'event', event: c.events[0].event, x, y };
        return { type: 'cluster', count: c.events.length, x, y };
      }
    }
    const lonlat = this.view.invert(x, y);
    if (!lonlat) return null;
    // Territories: smallest active entity containing the point wins, so
    // enclaves stay clickable under sprawling empires.
    let best: { entity: HistoricalEntity; area: number } | null = null;
    for (const a of this.lastActive.entities) {
      const geom = this.dominantGeometry(a);
      const feat = { type: 'Feature', geometry: geom, properties: {} } as const;
      if (geoContains(feat as never, lonlat)) {
        const area = this.geoAreaOf(geom);
        if (!best || area < best.area) best = { entity: a.entity, area };
      }
    }
    return best ? { type: 'entity', entity: best.entity, x, y } : null;
  }

  private dominantGeometry(a: ActiveEntity): Polygon | MultiPolygon {
    const snap = a.blend >= 0.5 ? a.toSnapshot : a.fromSnapshot;
    return resolveGeometry(snap.geometry);
  }

  private geoAreaOf(geom: Geometry): number {
    let v = this.areaCache.get(geom);
    if (v === undefined) {
      v = geoArea(geom as never);
      this.areaCache.set(geom, v);
    }
    return v;
  }

  // ---------------------------------------------------------------- drawing

  private step(now: number) {
    if (this.viewAnim) {
      const a = this.viewAnim;
      const t = Math.min(1, (now - a.start) / a.duration);
      const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
      this.view.setTransform(
        a.from[0] + (a.to[0] - a.from[0]) * e,
        a.from[1] + (a.to[1] - a.from[1]) * e,
        a.from[2] + (a.to[2] - a.from[2]) * e,
      );
      if (t >= 1) {
        this.viewAnim = null;
        this.onViewChanged();
      }
      this.dirty = true;
    }
    if (!this.dirty || !this.ctx) return;
    this.dirty = false;
    const t0 = performance.now();
    this.draw();
    this.frameMs = performance.now() - t0;
    this.frameCount++;
    if (t0 - this.fpsWindowStart > 1000) {
      this.fps = (this.frameCount * 1000) / (t0 - this.fpsWindowStart);
      this.frameCount = 0;
      this.fpsWindowStart = t0;
    }
  }

  private pathFor(geom: object): Path2D {
    const cached = this.pathCache.get(geom);
    if (cached && cached.version === this.view.version) return cached.path;
    const d = geoPath(this.view.projection)(geom as never);
    const path = new Path2D(d ?? undefined);
    this.pathCache.set(geom, { version: this.view.version, path });
    return path;
  }

  private draw() {
    const ctx = this.ctx!;
    const { width, height, k } = this.view;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const sphere = { type: 'Sphere' } as const;

    // Ocean + subtle radial depth.
    ctx.fillStyle = THEME.ocean;
    const spherePath = this.pathFor(sphere);
    ctx.fill(spherePath);
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(255,255,255,0.06)');
    grad.addColorStop(1, 'rgba(0,20,40,0.10)');
    ctx.save();
    ctx.clip(spherePath);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // Graticule.
    ctx.strokeStyle = THEME.graticule;
    ctx.lineWidth = 0.5;
    ctx.stroke(this.pathFor(geoGraticule10()));

    // Land with soft coast shadow.
    const land = getLand(k > 2.5);
    ctx.save();
    ctx.shadowColor = 'rgba(40, 40, 50, 0.35)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = THEME.land;
    ctx.fill(this.pathFor(land));
    ctx.restore();
    ctx.strokeStyle = THEME.coastline;
    ctx.lineWidth = Math.min(1.4, 0.5 + k * 0.06);
    ctx.stroke(this.pathFor(land));
    ctx.strokeStyle = THEME.sphereStroke;
    ctx.lineWidth = 1;
    ctx.stroke(spherePath);

    // Active historical content. Territory fills are clipped to the land
    // mask: hand-authored polygons may slop over the sea, but coastlines
    // stay crisp and match the basemap exactly.
    const date = this.store.getDate();
    const all = this.cache.query(date);
    const active = {
      entities:
        this.hiddenCategories.size === 0
          ? all.entities
          : all.entities.filter((a) => !this.hiddenCategories.has(a.entity.category)),
      events: this.eventsHidden ? [] : all.events,
    };
    this.lastActive = active;
    ctx.save();
    ctx.clip(this.pathFor(land));

    // Visual hierarchy: diffuse ranges under polities; big under small.
    const ordered = [...active.entities].sort((a, b) => {
      const da = DIFFUSE_CATEGORIES.has(a.entity.category) ? 0 : 1;
      const db = DIFFUSE_CATEGORIES.has(b.entity.category) ? 0 : 1;
      if (da !== db) return da - db;
      return this.geoAreaOf(this.dominantGeometry(b)) - this.geoAreaOf(this.dominantGeometry(a));
    });

    const labelInputs: LabelInput[] = [];
    for (const a of ordered) {
      const colour = a.entity.colour ?? CATEGORY_COLOURS[a.entity.category];
      const parts: { geom: Polygon | MultiPolygon; weight: number; conf: Confidence }[] = [];
      if (a.fromSnapshot === a.toSnapshot || a.blend <= 0.001) {
        parts.push({
          geom: resolveGeometry(a.fromSnapshot.geometry),
          weight: 1,
          conf: a.fromSnapshot.confidence,
        });
      } else if (a.blend >= 0.999) {
        parts.push({ geom: resolveGeometry(a.toSnapshot.geometry), weight: 1, conf: a.toSnapshot.confidence });
      } else {
        // Cross-fade between topologically incompatible snapshots.
        parts.push({
          geom: resolveGeometry(a.fromSnapshot.geometry),
          weight: 1 - a.blend,
          conf: a.fromSnapshot.confidence,
        });
        parts.push({ geom: resolveGeometry(a.toSnapshot.geometry), weight: a.blend, conf: a.toSnapshot.confidence });
      }

      const diffuse = DIFFUSE_CATEGORIES.has(a.entity.category);
      const baseOpacity = CATEGORY_FILL_OPACITY[a.entity.category];
      const isSelected = this.selectedEntityId === a.entity.id;
      const isHovered = this.hover?.type === 'entity' && this.hover.entity.id === a.entity.id;

      for (const part of parts) {
        const p = this.pathFor(part.geom);
        const alpha = a.alpha * part.weight;
        const fillAlpha = baseOpacity * alpha * (isHovered || isSelected ? 1.25 : 1);
        ctx.fillStyle = hexToRgba(colour, fillAlpha);
        ctx.fill(p);

        const edge = CONFIDENCE_EDGE[part.conf];
        // Diffuse ranges never get a boundary line and feather at least as
        // much as medium confidence would.
        const feather =
          Math.max(edge.feather, diffuse ? CONFIDENCE_EDGE.medium.feather : 0) *
          Math.min(2, 0.75 + k * 0.25);
        if (feather > 0) {
          // Feathered edge: halo strokes clipped to the polygon's exterior,
          // stepping the fill opacity down to zero. The interior stays flat
          // because none of the halo lands inside the shape.
          ctx.save();
          const outside = new Path2D();
          outside.rect(-1e5, -1e5, 2e5, 2e5);
          outside.addPath(p);
          ctx.clip(outside, 'evenodd');
          const steps: [width: number, opacity: number][] = [
            [feather * 0.7, 0.75],
            [feather * 1.4, 0.4],
            [feather * 2, 0.18],
          ];
          for (const [width, opacity] of steps) {
            ctx.strokeStyle = hexToRgba(colour, fillAlpha * opacity);
            ctx.lineWidth = width;
            ctx.stroke(p);
          }
          ctx.restore();
        }
        // Selection/hover outlines are a UI affordance, so they stay even
        // where confidence hides the boundary line.
        if (!diffuse && (edge.boundary || isSelected || isHovered)) {
          ctx.strokeStyle = hexToRgba(darken(colour, 0.35), Math.min(0.9, 0.55 + k * 0.06) * alpha);
          ctx.lineWidth = Math.min(2.4, 0.7 + k * 0.12) * (isSelected ? 2 : isHovered ? 1.5 : 1);
          ctx.stroke(p);
        }
      }

      labelInputs.push({
        active: a,
        geometry: this.dominantGeometry(a),
        colour: darken(colour, 0.45),
      });
    }

    ctx.restore(); // release land clip — labels and events may sit anywhere
    this.drawLabels(ctx, labelInputs);
    this.drawEvents(ctx, active.events);
  }

  private drawLabels(ctx: CanvasRenderingContext2D, inputs: LabelInput[]) {
    const measure = (text: string, fontSize: number, letterSpacing: number) => {
      ctx.font = `${fontSize}px 'Iowan Old Style', 'Palatino', 'Georgia', serif`;
      return ctx.measureText(text).width + letterSpacing * Math.max(0, text.length - 1);
    };
    const labels = placeLabels(inputs, this.view.projection, this.view.width, this.view.height, measure);
    for (const l of labels) {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.angle);
      const style = l.diffuse ? 'italic ' : '';
      ctx.font = `${style}${l.fontSize}px 'Iowan Old Style', 'Palatino', 'Georgia', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = l.alpha;
      // Per-character rendering gives us letter-spacing everywhere.
      const widths = [...l.text].map((ch) => ctx.measureText(ch).width);
      const total = widths.reduce((s, w) => s + w, 0) + l.letterSpacing * (l.text.length - 1);
      let cx = -total / 2;
      ctx.lineWidth = Math.max(2.5, l.fontSize * 0.18);
      ctx.strokeStyle = THEME.labelHalo;
      ctx.fillStyle = l.colour;
      ctx.lineJoin = 'round';
      [...l.text].forEach((ch, i) => {
        const w = widths[i];
        ctx.strokeText(ch, cx + w / 2, 0);
        ctx.fillText(ch, cx + w / 2, 0);
        cx += w + l.letterSpacing;
      });
      ctx.restore();
    }
  }

  private drawEvents(ctx: CanvasRenderingContext2D, events: ActiveEvent[]) {
    // Screen-space greedy clustering.
    const proj = this.view.projection;
    const clusters: EventCluster[] = [];
    const CLUSTER_R = 26;
    const sorted = [...events].sort((a, b) => b.event.importance - a.event.importance);
    for (const ae of sorted) {
      const p = proj([ae.event.location.longitude, ae.event.location.latitude]);
      if (!p) continue;
      const [x, y] = p;
      if (x < -30 || y < -30 || x > this.view.width + 30 || y > this.view.height + 30) continue;
      const near = clusters.find((c) => Math.hypot(c.x - x, c.y - y) < CLUSTER_R);
      if (near) {
        near.events.push(ae);
        near.alpha = Math.max(near.alpha, ae.alpha);
      } else {
        clusters.push({ x, y, events: [ae], alpha: ae.alpha });
      }
    }
    this.clusters = clusters;

    const labelBoxes: { x0: number; y0: number; x1: number; y1: number }[] = [];
    for (const c of clusters) {
      ctx.save();
      ctx.globalAlpha = c.alpha;
      if (c.events.length > 1) {
        // Cluster bubble with count.
        ctx.beginPath();
        ctx.arc(c.x, c.y, 13, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60, 48, 30, 0.82)';
        ctx.fill();
        ctx.strokeStyle = THEME.eventFill;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.fillStyle = THEME.eventFill;
        ctx.font = `600 11px 'Avenir Next', 'Segoe UI', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(c.events.length), c.x, c.y + 0.5);
      } else {
        const ae = c.events[0];
        const ev = ae.event;
        const colour = EVENT_CATEGORY_COLOURS[ev.category] ?? EVENT_CATEGORY_COLOURS.other;
        const r = 3.5 + ev.importance * 1.1;
        if (ae.occurring && !this.reducedMotion) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(colour, 0.45 * c.alpha);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fillStyle = THEME.eventFill;
        ctx.fill();
        ctx.strokeStyle = colour;
        ctx.lineWidth = 1.8;
        if (ev.location.approximate) ctx.setLineDash([3, 2.5]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(c.x, c.y, Math.max(1.5, r * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = colour;
        ctx.fill();

        // Title tag for important events, collision-checked among events.
        if (ev.importance >= 4 && c.alpha > 0.4) {
          ctx.font = `600 11px 'Avenir Next', 'Segoe UI', sans-serif`;
          const w = ctx.measureText(ev.title).width;
          const box = { x0: c.x + r + 4, y0: c.y - 8, x1: c.x + r + 8 + w, y1: c.y + 8 };
          if (!labelBoxes.some((b) => box.x0 < b.x1 && b.x0 < box.x1 && box.y0 < b.y1 && b.y0 < box.y1)) {
            labelBoxes.push(box);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 3;
            ctx.strokeStyle = THEME.labelHalo;
            ctx.lineJoin = 'round';
            ctx.strokeText(ev.title, c.x + r + 6, c.y);
            ctx.fillStyle = '#4a3a22';
            ctx.fillText(ev.title, c.x + r + 6, c.y);
          }
        }
      }
      ctx.restore();
    }
  }
}
