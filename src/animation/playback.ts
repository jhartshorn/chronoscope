import type { HistoricalEvent } from '../types';
import type { TimeStore } from './timeStore';
import { dateToSliderPosition } from '../history/timescale';

export const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 2, 5, 10] as const;
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

/** At 1×, the full timeline takes this many seconds to play. */
export const BASE_TRAVERSAL_SECONDS = 150;

export interface PlaybackState {
  playing: boolean;
  speed: PlaybackSpeed;
  loop: boolean;
  /** Pause briefly when passing very important events. */
  pauseAtMajorEvents: boolean;
  /** True while automatically dwelling at a major event. */
  dwelling: boolean;
}

type Ticker = (cb: (dtSeconds: number) => void) => () => void;

const rafTicker: Ticker = (cb) => {
  let last = performance.now();
  let raf = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    cb(dt);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
};

/**
 * Playback advances in *slider space*, not calendar space, so the perceived
 * rate stays usable across the non-linear timescale: deep prehistory flies
 * past in millennia while the 20th century unfolds year by year.
 */
export class PlaybackEngine {
  private state: PlaybackState = {
    playing: false,
    speed: 1,
    loop: false,
    pauseAtMajorEvents: false,
    dwelling: false,
  };
  private listeners = new Set<() => void>();
  private stopTicker: (() => void) | null = null;
  private dwellRemaining = 0;
  private passedEventIds = new Set<string>();
  private majorEventPositions: { id: string; position: number }[] = [];

  constructor(
    private store: TimeStore,
    private ticker: Ticker = rafTicker,
  ) {}

  setMajorEvents(events: HistoricalEvent[]) {
    this.majorEventPositions = events
      .filter((e) => e.importance >= 5)
      .map((e) => ({ id: e.id, position: dateToSliderPosition(e.date) }))
      .sort((a, b) => a.position - b.position);
  }

  getState = (): PlaybackState => this.state;

  subscribe = (l: () => void): (() => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };

  private emit(patch: Partial<PlaybackState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l());
  }

  play() {
    if (this.state.playing) return;
    // Restart from the beginning if we finished a non-looping run.
    if (this.store.getPosition() >= 1) {
      this.store.setPosition(0);
      this.passedEventIds.clear();
    }
    this.emit({ playing: true });
    this.stopTicker = this.ticker((dt) => this.tick(dt));
  }

  pause() {
    if (!this.state.playing) return;
    this.stopTicker?.();
    this.stopTicker = null;
    this.emit({ playing: false, dwelling: false });
    this.dwellRemaining = 0;
  }

  toggle() {
    this.state.playing ? this.pause() : this.play();
  }

  restart() {
    this.store.setPosition(0);
    this.passedEventIds.clear();
  }

  setSpeed(speed: PlaybackSpeed) {
    this.emit({ speed });
  }

  cycleSpeed(direction: 1 | -1) {
    const i = PLAYBACK_SPEEDS.indexOf(this.state.speed);
    const next = Math.min(PLAYBACK_SPEEDS.length - 1, Math.max(0, i + direction));
    this.setSpeed(PLAYBACK_SPEEDS[next]);
  }

  setLoop(loop: boolean) {
    this.emit({ loop });
  }

  setPauseAtMajorEvents(v: boolean) {
    this.emit({ pauseAtMajorEvents: v });
    this.passedEventIds.clear();
  }

  /** Called when the user drags the slider: clear dwell state and passed set. */
  notifyScrubbed() {
    this.dwellRemaining = 0;
    if (this.state.dwelling) this.emit({ dwelling: false });
    this.passedEventIds.clear();
  }

  /** One animation step. Public for tests. */
  tick(dtSeconds: number) {
    if (!this.state.playing) return;

    if (this.dwellRemaining > 0) {
      this.dwellRemaining -= dtSeconds;
      if (this.dwellRemaining <= 0) this.emit({ dwelling: false });
      return;
    }

    const before = this.store.getPosition();
    const delta = (dtSeconds / BASE_TRAVERSAL_SECONDS) * this.state.speed;
    let after = before + delta;

    if (after >= 1) {
      if (this.state.loop) {
        after = after % 1;
        this.passedEventIds.clear();
      } else {
        this.store.setPosition(1);
        this.pause();
        return;
      }
    }

    // Dwell at major events crossed during this step.
    if (this.state.pauseAtMajorEvents && after > before) {
      for (const ev of this.majorEventPositions) {
        if (ev.position > before && ev.position <= after && !this.passedEventIds.has(ev.id)) {
          this.passedEventIds.add(ev.id);
          this.store.setPosition(ev.position);
          this.dwellRemaining = 1.8;
          this.emit({ dwelling: true });
          return;
        }
      }
    }

    this.store.setPosition(after);
  }
}
