import { useSyncExternalStore } from 'react';
import { timeStore } from './animation/timeStore';
import type { PlaybackEngine } from './animation/playback';

/** Subscribe to the shared slider position (0..1). */
export function useSliderPosition(): number {
  return useSyncExternalStore(timeStore.subscribe, timeStore.getPosition, timeStore.getPosition);
}

/** Subscribe to playback engine state. */
export function usePlaybackState(engine: PlaybackEngine) {
  return useSyncExternalStore(engine.subscribe, engine.getState, engine.getState);
}

let reducedMotionCache: boolean | null = null;
export function prefersReducedMotion(): boolean {
  if (reducedMotionCache === null) {
    reducedMotionCache =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return reducedMotionCache;
}
