import { describe, expect, it } from 'vitest';
import {
  activeEntitiesAt,
  activeEventsAt,
  ActiveSetCache,
  entityAlpha,
  eventAlpha,
  snapshotPair,
} from './engine';
import { hd } from './date';
import type { HistoricalEntity, HistoricalEvent } from '../types';
import { poly, snap, src } from '../data/helpers';

const square = (cx: number, cy: number, r = 3) =>
  poly([
    [cx - r, cy - r],
    [cx + r, cy - r],
    [cx + r, cy + r],
    [cx - r, cy + r],
  ]);

function makeEntity(overrides: Partial<HistoricalEntity> = {}): HistoricalEntity {
  return {
    id: 't',
    name: 'Test',
    category: 'kingdom',
    start: hd(1000),
    end: hd(1200),
    confidence: 'medium',
    fadeYears: 20,
    sources: [src('test')],
    snapshots: [snap(1000, square(0, 0), 'medium'), snap(1200, square(10, 0), 'medium')],
    ...overrides,
  };
}

describe('entity activation', () => {
  it('is zero well before start and after end', () => {
    const e = makeEntity();
    expect(entityAlpha(e, hd(900))).toBe(0);
    expect(entityAlpha(e, hd(1300))).toBe(0);
  });

  it('is fully on during its lifetime', () => {
    const e = makeEntity();
    expect(entityAlpha(e, hd(1100))).toBe(1);
  });

  it('fades in before start and out after end (0..1)', () => {
    const e = makeEntity();
    const fadingIn = entityAlpha(e, hd(990)); // within 20y fade before 1000
    const fadingOut = entityAlpha(e, hd(1210));
    expect(fadingIn).toBeGreaterThan(0);
    expect(fadingIn).toBeLessThan(1);
    expect(fadingOut).toBeGreaterThan(0);
    expect(fadingOut).toBeLessThan(1);
  });

  it('activates and deactivates in the active set', () => {
    const e = makeEntity();
    expect(activeEntitiesAt([e], hd(1100)).length).toBe(1);
    expect(activeEntitiesAt([e], hd(500)).length).toBe(0);
  });

  it('selects and blends the correct snapshot pair', () => {
    const e = makeEntity();
    const early = snapshotPair(e, hd(1000));
    expect(early.blend).toBe(0);
    const mid = snapshotPair(e, hd(1100));
    expect(mid.blend).toBeGreaterThan(0);
    expect(mid.blend).toBeLessThan(1);
    const late = snapshotPair(e, hd(1200));
    expect(late.from).toBe(late.to);
  });
});

describe('event display windows', () => {
  const ev: HistoricalEvent = {
    id: 'e',
    title: 'E',
    date: hd(1000),
    location: { latitude: 0, longitude: 0 },
    category: 'battle',
    description: '',
    importance: 3,
    displayWindowBefore: { years: 50 },
    displayWindowAfter: { years: 100 },
    sources: [],
  };

  it('is visible within the window and hidden outside', () => {
    expect(eventAlpha(ev, hd(1000))).toBe(1);
    expect(eventAlpha(ev, hd(940))).toBe(0); // 60y before, window is 50
    expect(eventAlpha(ev, hd(1101))).toBe(0); // 101y after, window is 100
    expect(eventAlpha(ev, hd(975))).toBeGreaterThan(0); // fading in
  });

  it('respects endDate for spanning events', () => {
    const span = { ...ev, endDate: hd(1005) };
    expect(eventAlpha(span, hd(1003))).toBe(1); // still occurring
    const active = activeEventsAt([span], hd(1003));
    expect(active[0].occurring).toBe(true);
  });

  it('deep-prehistory windows keep events visible across long spans', () => {
    const deep: HistoricalEvent = {
      ...ev,
      date: hd(1 - 60_000),
      displayWindowBefore: { years: 20_000 },
      displayWindowAfter: { years: 30_000 },
    };
    expect(eventAlpha(deep, hd(1 - 60_000))).toBe(1); // at the event date
    expect(eventAlpha(deep, hd(1 - 45_000))).toBeGreaterThan(0); // 15k y later, still in window
    expect(eventAlpha(deep, hd(1 - 75_000))).toBeGreaterThan(0); // 15k y earlier, still in window
    expect(eventAlpha(deep, hd(1 - 95_000))).toBe(0); // 35k y before: outside 20k window
  });
});

describe('ActiveSetCache', () => {
  it('returns the same results as the direct computation', () => {
    const entities = [makeEntity(), makeEntity({ id: 't2', start: hd(1150), end: hd(1400) })];
    const cache = new ActiveSetCache(entities, []);
    for (const y of [1000, 1100, 1200, 1300]) {
      const cached = cache.query(hd(y)).entities.map((a) => a.entity.id).sort();
      const direct = activeEntitiesAt(entities, hd(y)).map((a) => a.entity.id).sort();
      expect(cached).toEqual(direct);
    }
  });
});
