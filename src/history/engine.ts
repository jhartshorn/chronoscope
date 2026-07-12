import type {
  ActiveEntity,
  ActiveEvent,
  HistoricalDate,
  HistoricalEntity,
  HistoricalEvent,
  TerritorySnapshot,
} from '../types';

/**
 * The historical engine: given the dataset and a date, decide what exists,
 * how faded it is, and which pair of territorial snapshots to blend.
 *
 * Pure functions + a small cache. No DOM, no rendering — the map renderer
 * consumes `ActiveEntity`/`ActiveEvent` and can be swapped out.
 */

/** Default fade length scales with how deep in time the entity sits. */
export function defaultFadeYears(entity: HistoricalEntity): number {
  if (entity.fadeYears !== undefined) return entity.fadeYears;
  const span = entity.end.year - entity.start.year;
  const depth = Math.max(1, -entity.start.year); // years before 1 CE
  // Prehistoric ranges fade over millennia; modern states over a few years.
  return Math.max(2, Math.min(span * 0.15, depth * 0.04 + 4));
}

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** Fade alpha for an entity at a date: 0 outside fade range, 1 when fully alive. */
export function entityAlpha(entity: HistoricalEntity, date: HistoricalDate): number {
  const fade = defaultFadeYears(entity);
  const y = date.year;
  if (y < entity.start.year - fade || y > entity.end.year + fade) return 0;
  let a = 1;
  if (y < entity.start.year) a = smoothstep((y - (entity.start.year - fade)) / fade);
  else if (y > entity.end.year) a = smoothstep((entity.end.year + fade - y) / fade);
  return a;
}

/**
 * Select the snapshot pair straddling `date` and the blend factor between
 * them. Outside the snapshot range, clamps to the first/last snapshot.
 */
export function snapshotPair(
  entity: HistoricalEntity,
  date: HistoricalDate,
): { from: TerritorySnapshot; to: TerritorySnapshot; blend: number } {
  const snaps = entity.snapshots;
  if (snaps.length === 1) return { from: snaps[0], to: snaps[0], blend: 0 };
  const y = date.year;
  if (y <= snaps[0].date.year) return { from: snaps[0], to: snaps[0], blend: 0 };
  const last = snaps[snaps.length - 1];
  if (y >= last.date.year) return { from: last, to: last, blend: 0 };
  for (let i = 0; i < snaps.length - 1; i++) {
    const a = snaps[i];
    const b = snaps[i + 1];
    if (y >= a.date.year && y <= b.date.year) {
      const span = b.date.year - a.date.year;
      const blend = span <= 0 ? 1 : smoothstep((y - a.date.year) / span);
      return { from: a, to: b, blend };
    }
  }
  return { from: last, to: last, blend: 0 };
}

export function activeEntitiesAt(
  entities: HistoricalEntity[],
  date: HistoricalDate,
): ActiveEntity[] {
  const out: ActiveEntity[] = [];
  for (const entity of entities) {
    const alpha = entityAlpha(entity, date);
    if (alpha <= 0.003) continue;
    const { from, to, blend } = snapshotPair(entity, date);
    out.push({ entity, alpha, fromSnapshot: from, toSnapshot: to, blend });
  }
  return out;
}

/** Event visibility window in years, before and after the nominal date. */
export function eventWindow(event: HistoricalEvent): { before: number; after: number } {
  return {
    before: event.displayWindowBefore.years,
    after: event.displayWindowAfter.years,
  };
}

export function eventAlpha(event: HistoricalEvent, date: HistoricalDate): number {
  const { before, after } = eventWindow(event);
  const start = event.date.year - before;
  const coreEnd = event.endDate ? event.endDate.year : event.date.year;
  const end = coreEnd + after;
  const y = date.year;
  if (y < start || y > end) return 0;
  if (y < event.date.year) return smoothstep((y - start) / Math.max(before, 1e-9));
  if (y > coreEnd) return smoothstep((end - y) / Math.max(after, 1e-9));
  return 1;
}

export function activeEventsAt(
  events: HistoricalEvent[],
  date: HistoricalDate,
): ActiveEvent[] {
  const out: ActiveEvent[] = [];
  for (const event of events) {
    const alpha = eventAlpha(event, date);
    if (alpha <= 0.01) continue;
    const coreEnd = event.endDate ? event.endDate.year : event.date.year;
    out.push({
      event,
      alpha,
      occurring: date.year >= event.date.year && date.year <= coreEnd,
    });
  }
  return out;
}

/**
 * Time-bucketed cache of active sets. Entity activation changes slowly
 * relative to frame rate, so we only recompute when the date leaves a small
 * neighbourhood of the last query — but alphas must stay smooth, so alphas
 * are always recomputed; only the *candidate list* is cached.
 */
export class ActiveSetCache {
  private entityCandidates: HistoricalEntity[] | null = null;
  private eventCandidates: HistoricalEvent[] | null = null;
  private cachedAtYear = Number.NaN;
  private validRadius = 0;

  constructor(
    private entities: HistoricalEntity[],
    private events: HistoricalEvent[],
  ) {}

  private refresh(date: HistoricalDate) {
    // Candidates: everything whose (padded) lifetime intersects a window
    // around the query date. The window scales with historical depth.
    const radius = Math.max(20, Math.abs(date.year) * 0.02);
    const lo = date.year - radius * 2;
    const hi = date.year + radius * 2;
    this.entityCandidates = this.entities.filter((e) => {
      const fade = defaultFadeYears(e);
      return e.start.year - fade <= hi && e.end.year + fade >= lo;
    });
    this.eventCandidates = this.events.filter((ev) => {
      const w = eventWindow(ev);
      const end = (ev.endDate ? ev.endDate.year : ev.date.year) + w.after;
      return ev.date.year - w.before <= hi && end >= lo;
    });
    this.cachedAtYear = date.year;
    this.validRadius = radius;
  }

  query(date: HistoricalDate): { entities: ActiveEntity[]; events: ActiveEvent[] } {
    if (
      this.entityCandidates === null ||
      Math.abs(date.year - this.cachedAtYear) > this.validRadius
    ) {
      this.refresh(date);
    }
    return {
      entities: activeEntitiesAt(this.entityCandidates!, date),
      events: activeEventsAt(this.eventCandidates!, date),
    };
  }

  invalidate() {
    this.entityCandidates = null;
    this.eventCandidates = null;
  }
}
