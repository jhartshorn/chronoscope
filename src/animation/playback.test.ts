import { beforeEach, describe, expect, it } from 'vitest';
import { PlaybackEngine, PLAYBACK_SPEEDS } from './playback';
import { TimeStore } from './timeStore';

/** A ticker we drive manually, so tests are deterministic. */
function makeEngine() {
  const store = new TimeStore();
  let cb: ((dt: number) => void) | null = null;
  const engine = new PlaybackEngine(store, (fn) => {
    cb = fn;
    return () => {
      cb = null;
    };
  });
  return { store, engine, tick: (dt: number) => cb?.(dt) };
}

describe('playback engine', () => {
  let ctx: ReturnType<typeof makeEngine>;
  beforeEach(() => {
    ctx = makeEngine();
  });

  it('advances position while playing', () => {
    ctx.store.setPosition(0);
    ctx.engine.play();
    expect(ctx.engine.getState().playing).toBe(true);
    ctx.tick(1);
    expect(ctx.store.getPosition()).toBeGreaterThan(0);
  });

  it('advances faster at higher speed (slider-space)', () => {
    ctx.store.setPosition(0);
    ctx.engine.setSpeed(1);
    ctx.engine.play();
    ctx.tick(1);
    const slow = ctx.store.getPosition();

    const ctx2 = makeEngine();
    ctx2.store.setPosition(0);
    ctx2.engine.setSpeed(10);
    ctx2.engine.play();
    ctx2.tick(1);
    const fast = ctx2.store.getPosition();

    expect(fast).toBeCloseTo(slow * 10, 5);
  });

  it('pauses at the end when not looping', () => {
    ctx.store.setPosition(0.999);
    ctx.engine.play();
    ctx.tick(60); // large step, overshoots the end
    expect(ctx.store.getPosition()).toBe(1);
    expect(ctx.engine.getState().playing).toBe(false);
  });

  it('loops back to the start when looping is enabled', () => {
    ctx.store.setPosition(0.999);
    ctx.engine.setLoop(true);
    ctx.engine.play();
    ctx.tick(60);
    expect(ctx.store.getPosition()).toBeLessThan(0.5);
    expect(ctx.engine.getState().playing).toBe(true);
  });

  it('restart returns to the beginning', () => {
    ctx.store.setPosition(0.7);
    ctx.engine.restart();
    expect(ctx.store.getPosition()).toBe(0);
  });

  it('cycles speed within bounds', () => {
    ctx.engine.setSpeed(PLAYBACK_SPEEDS[0]);
    ctx.engine.cycleSpeed(-1);
    expect(ctx.engine.getState().speed).toBe(PLAYBACK_SPEEDS[0]);
    for (let i = 0; i < 10; i++) ctx.engine.cycleSpeed(1);
    expect(ctx.engine.getState().speed).toBe(PLAYBACK_SPEEDS[PLAYBACK_SPEEDS.length - 1]);
  });

  it('toggle flips playing state', () => {
    expect(ctx.engine.getState().playing).toBe(false);
    ctx.engine.toggle();
    expect(ctx.engine.getState().playing).toBe(true);
    ctx.engine.toggle();
    expect(ctx.engine.getState().playing).toBe(false);
  });

  it('does not advance while paused (drag-only)', () => {
    ctx.store.setPosition(0.3);
    ctx.tick(1); // no play() called
    expect(ctx.store.getPosition()).toBe(0.3);
  });

  it('dwells at a major event when the option is on', () => {
    ctx.engine.setMajorEvents([
      {
        id: 'x',
        title: 'X',
        date: { year: 1 },
        location: { latitude: 0, longitude: 0 },
        category: 'politics',
        description: '',
        importance: 5,
        displayWindowBefore: { years: 1 },
        displayWindowAfter: { years: 1 },
        sources: [],
      },
    ]);
    ctx.engine.setPauseAtMajorEvents(true);
    ctx.store.setPosition(0);
    ctx.engine.play();
    // Step across the timeline in chunks; it should stop to dwell at the event.
    let dwelt = false;
    for (let i = 0; i < 40 && !dwelt; i++) {
      ctx.tick(5);
      if (ctx.engine.getState().dwelling) dwelt = true;
    }
    expect(dwelt).toBe(true);
  });
});

describe('reduced motion', () => {
  it('slider space stepping is independent of reduced motion (logic-level)', () => {
    // Playback math itself does not branch on reduced motion; the renderer
    // does. This guards that advancing is purely slider-space arithmetic.
    ctx = makeEngine();
    ctx.store.setPosition(0.5);
    ctx.engine.setSpeed(2);
    ctx.engine.play();
    const before = ctx.store.getPosition();
    ctx.tick(0.5);
    expect(ctx.store.getPosition()).toBeGreaterThan(before);
  });
  let ctx: ReturnType<typeof makeEngine>;
});
