import type { HistoricalDate } from '../types';
import { sliderPositionToDate } from '../history/timescale';

/**
 * A tiny external store holding the current slider position (0..1).
 *
 * The canvas renderer and the date read-out subscribe directly, so playback
 * at 60 fps never re-renders the React tree; React components that *do* need
 * the value use `useSyncExternalStore` with this store.
 */
export class TimeStore {
  private position = 0;
  private listeners = new Set<() => void>();

  getPosition = (): number => this.position;

  getDate = (): HistoricalDate => sliderPositionToDate(this.position);

  setPosition = (p: number): void => {
    const clamped = Math.min(1, Math.max(0, p));
    if (clamped === this.position) return;
    this.position = clamped;
    this.listeners.forEach((l) => l());
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export const timeStore = new TimeStore();
