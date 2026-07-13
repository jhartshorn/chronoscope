import type { HistoricalDate } from '../types';
import { hd, TIMELINE_END_YEAR, TIMELINE_START_YEAR, formatDate } from './date';

/**
 * Non-linear timescale.
 *
 * The slider position p ∈ [0, 1] is split into two segments at 3000 BCE
 * (astronomical year -2999), each covered by its own smooth logarithmic
 * curve, invertible within its half:
 *
 *   - Prehistory (300,000 BCE → 3000 BCE) is squeezed into p ∈ [0, SPLIT].
 *     Deep prehistory used to eat up roughly half the bar under a single
 *     global curve; explicitly capping it keeps that era navigable while
 *     giving the other 75% of the bar to the last 5,000 years.
 *   - History (3000 BCE → present) fills p ∈ [SPLIT, 1] with the same
 *     "finer resolution nearer the present" log shape as before.
 *
 * Within each segment, p2 ∈ [0, 1] maps to "years before the segment's late
 * anchor" (ybp) exactly as the old single-segment curve did:
 *
 *    ybp(p2) = C · ((1 + S/C)^(1 − p2) − 1)
 *    p2(ybp) = 1 − ln(1 + ybp/C) / ln(1 + S/C)
 *
 * where S is the segment's span and C = 55 tunes how much of the segment
 * the recent end receives (unchanged from the original single-curve tuning).
 */

const PIVOT_YEAR = -2999; // 3000 BCE (no year zero: 1 - 3000)
const SPLIT = 0.25; // fraction of the slider given to prehistory

const T_PRE = PIVOT_YEAR - TIMELINE_START_YEAR; // prehistory span in years
const T_HIST = TIMELINE_END_YEAR - PIVOT_YEAR; // history span in years
const C = 55;
const LOG_PRE = Math.log(1 + T_PRE / C);
const LOG_HIST = Math.log(1 + T_HIST / C);

export function sliderPositionToDate(position: number): HistoricalDate {
  const p = Math.min(1, Math.max(0, position));
  if (p <= SPLIT) {
    const p2 = p / SPLIT;
    const ybp = C * (Math.exp((1 - p2) * LOG_PRE) - 1);
    return hd(PIVOT_YEAR - ybp);
  }
  const p2 = (p - SPLIT) / (1 - SPLIT);
  const ybp = C * (Math.exp((1 - p2) * LOG_HIST) - 1);
  return hd(TIMELINE_END_YEAR - ybp);
}

export function dateToSliderPosition(date: HistoricalDate): number {
  if (date.year <= PIVOT_YEAR) {
    const ybp = Math.min(T_PRE, Math.max(0, PIVOT_YEAR - date.year));
    const p2 = 1 - Math.log(1 + ybp / C) / LOG_PRE;
    return p2 * SPLIT;
  }
  const ybp = Math.min(T_HIST, Math.max(0, TIMELINE_END_YEAR - date.year));
  const p2 = 1 - Math.log(1 + ybp / C) / LOG_HIST;
  return SPLIT + p2 * (1 - SPLIT);
}

/** Local scale: how many historical years one unit of (global) slider position covers at p. */
export function yearsPerSliderUnit(position: number): number {
  const p = Math.min(1, Math.max(0, position));
  if (p <= SPLIT) {
    const ybp = PIVOT_YEAR - sliderPositionToDate(p).year;
    return ((ybp + C) * LOG_PRE) / SPLIT;
  }
  const ybp = TIMELINE_END_YEAR - sliderPositionToDate(p).year;
  return ((ybp + C) * LOG_HIST) / (1 - SPLIT);
}

export interface TimelineTick {
  position: number;
  label: string;
  major: boolean;
}

/**
 * Maps a "view" position (0..1, what's actually drawn on the slider bar) to
 * and from the underlying global slider position. The default is the
 * identity — the whole timeline. A period-focus view instead windows onto a
 * sub-range of the global position space, so the same tick-generation and
 * interaction logic can drive a zoomed-in bar (see `periodTickRange`).
 */
export interface TickRange {
  toGlobal: (viewPosition: number) => number;
  toView: (globalPosition: number) => number;
  /** d(globalPosition)/d(viewPosition); constant since the window is a linear rescale. */
  scale: number;
  startLabel: string;
  endLabel: string;
}

export const FULL_RANGE: TickRange = {
  toGlobal: (p) => p,
  toView: (p) => p,
  scale: 1,
  startLabel: '300k BCE',
  endLabel: 'Present',
};

/** A view range windowed onto [startYear, endYear] of the global timeline. */
export function periodTickRange(startYear: number, endYear: number): TickRange {
  const startP = dateToSliderPosition(hd(startYear));
  const endP = dateToSliderPosition(hd(endYear));
  const span = endP - startP;
  return {
    toGlobal: (p) => startP + p * span,
    toView: (gp) => (gp - startP) / span,
    scale: span,
    startLabel: formatDate(hd(startYear), { months: false, compact: true }),
    endLabel: formatDate(hd(endYear), { months: false, compact: true }),
  };
}

const NICE_STEPS = [
  1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10_000, 25_000, 50_000, 100_000,
];

function niceStep(raw: number): number {
  for (const s of NICE_STEPS) if (s >= raw) return s;
  return NICE_STEPS[NICE_STEPS.length - 1];
}

/**
 * Format a tick's year, rounding no coarser than `formatDate`'s own
 * magnitude-based thresholds (1,000y ≥ 100,000 BCE; 500y ≥ 20,000 BCE; 100y
 * ≥ 3,000 BCE; exact otherwise) — but no coarser than the tick's *own* step
 * either. A period-focus zoom can produce ticks as fine as 25y within the
 * ≥ 3,000 BCE band, where formatDate's flat 100y rounding would collapse
 * adjacent ticks onto the same label; capping at `min(step, threshold)`
 * avoids that while never rounding more precisely than formatDate would
 * (which also keeps small BCE/CE ticks, where the threshold is 1, exact —
 * important right around the epoch, where a stray big step must not round
 * BCE 1 down to a nonexistent "0 BCE").
 */
function formatTickLabel(year: number, step: number): string {
  if (year <= 0) {
    const bceExact = 1 - year;
    const threshold = bceExact >= 100_000 ? 1000 : bceExact >= 20_000 ? 500 : bceExact >= 3_000 ? 100 : 1;
    const g = Math.min(step, threshold);
    const bce = Math.round(bceExact / g) * g;
    if (bce >= 10_000) {
      const k = bce / 1000;
      return `${Number.isInteger(k) ? k : k.toFixed(1)}k BCE`;
    }
    return `${bce.toLocaleString('en-GB')} BCE`;
  }
  const whole = Math.round(year);
  return whole < 1000 ? `${whole} CE` : `${whole}`;
}

/**
 * Generate tick marks adapted to the non-linear scale: walk the (view) slider
 * and, at each step, emit the next "nice" round year given the local
 * resolution. `range` lets this drive either the full timeline or a
 * period-focused window (see `periodTickRange`).
 */
export function generateTicks(
  widthPx: number,
  minSpacingPx = 90,
  range: TickRange = FULL_RANGE,
): TimelineTick[] {
  const ticks: TimelineTick[] = [];
  const minDp = minSpacingPx / Math.max(200, widthPx);
  let p = 0;
  let guard = 0;
  let lastYear = Number.NEGATIVE_INFINITY;
  while (p < 1 && guard++ < 400) {
    const globalP = range.toGlobal(p);
    const year = sliderPositionToDate(globalP).year;
    const localYears = yearsPerSliderUnit(globalP) * range.scale * minDp; // years spanned by min spacing
    const step = niceStep(localYears);
    // Next round year at this resolution:
    let tickYear = Math.ceil(year / step) * step;
    if (tickYear <= lastYear) tickYear = lastYear + step;
    // The curve's resolution jumps sharply at the prehistory/history seam
    // (PIVOT_YEAR): a coarse step taken just before it can otherwise leap
    // straight over the whole newly-fine region just after it. Land exactly
    // on the seam instead, so the next iteration resamples at the right
    // (much finer) resolution.
    if (year < PIVOT_YEAR && tickYear >= PIVOT_YEAR) tickYear = PIVOT_YEAR;
    const pos = range.toView(dateToSliderPosition(hd(tickYear)));
    // Stop once we'd crowd the endpoint tick (dropped by the filter below anyway).
    if (pos >= 1 - minDp * 0.9) break;
    ticks.push({
      position: pos,
      label: formatTickLabel(tickYear, step),
      major: step >= 100 ? tickYear % (step * 2) === 0 : tickYear % 100 === 0,
    });
    lastYear = tickYear;
    p = Math.max(pos + minDp, p + minDp / 4);
  }
  // Endpoint labels.
  ticks.unshift({ position: 0, label: range.startLabel, major: true });
  ticks.push({ position: 1, label: range.endLabel, major: true });
  // Drop ticks crowding the endpoints.
  return ticks.filter(
    (t, i) =>
      i === 0 ||
      i === ticks.length - 1 ||
      (t.position > minDp * 0.9 && t.position < 1 - minDp * 0.9),
  );
}
