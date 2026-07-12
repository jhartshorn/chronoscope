import type { HistoricalDate } from '../types';
import { hd, TIMELINE_END_YEAR, TIMELINE_START_YEAR, yearsBeforePresent, formatDate } from './date';

/**
 * Non-linear timescale.
 *
 * The slider position p ∈ [0, 1] maps to "years before present" (ybp) with a
 * single smooth logarithmic curve — no piecewise seams, strictly monotonic,
 * exactly invertible:
 *
 *    ybp(p) = C · ((1 + T/C)^(1 − p) − 1)
 *    p(ybp) = 1 − ln(1 + ybp/C) / ln(1 + T/C)
 *
 * where T is the full span (~302,000 years) and C tunes how much of the
 * slider the recent past receives. With C = 55:
 *
 *    1% of slider ≈ 26,000 y in deep prehistory
 *                 ≈    350 y around 2000 BCE
 *                 ≈     90 y around 1000 CE
 *                 ≈     15 y around 1900 CE
 *                 ≈      5 y at the present end
 */

const T = TIMELINE_END_YEAR - TIMELINE_START_YEAR; // total span in years
const C = 55;
const LOG_TOTAL = Math.log(1 + T / C);

export function sliderPositionToDate(position: number): HistoricalDate {
  const p = Math.min(1, Math.max(0, position));
  const ybp = C * (Math.exp((1 - p) * LOG_TOTAL) - 1);
  return hd(TIMELINE_END_YEAR - ybp);
}

export function dateToSliderPosition(date: HistoricalDate): number {
  const ybp = Math.min(T, Math.max(0, yearsBeforePresent(date)));
  return 1 - Math.log(1 + ybp / C) / LOG_TOTAL;
}

/** Local scale: how many historical years one unit of slider covers at p. */
export function yearsPerSliderUnit(position: number): number {
  const ybp = yearsBeforePresent(sliderPositionToDate(position));
  return (ybp + C) * LOG_TOTAL;
}

export interface TimelineTick {
  position: number;
  label: string;
  major: boolean;
}

const NICE_STEPS = [
  1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10_000, 25_000, 50_000, 100_000,
];

function niceStep(raw: number): number {
  for (const s of NICE_STEPS) if (s >= raw) return s;
  return NICE_STEPS[NICE_STEPS.length - 1];
}

/**
 * Generate tick marks adapted to the non-linear scale: walk the slider and,
 * at each step, emit the next "nice" round year given the local resolution.
 */
export function generateTicks(widthPx: number, minSpacingPx = 90): TimelineTick[] {
  const ticks: TimelineTick[] = [];
  const minDp = minSpacingPx / Math.max(200, widthPx);
  let p = 0;
  let guard = 0;
  let lastYear = Number.NEGATIVE_INFINITY;
  while (p < 1 && guard++ < 400) {
    const year = sliderPositionToDate(p).year;
    const localYears = yearsPerSliderUnit(p) * minDp; // years spanned by min spacing
    const step = niceStep(localYears);
    // Next round year at this resolution:
    let tickYear = Math.ceil(year / step) * step;
    if (tickYear <= lastYear) tickYear = lastYear + step;
    if (tickYear >= TIMELINE_END_YEAR - localYears) break;
    const pos = dateToSliderPosition(hd(tickYear));
    if (pos >= 1) break;
    ticks.push({
      position: pos,
      label: formatDate(hd(tickYear), { months: false, compact: true }),
      major: step >= 100 ? tickYear % (step * 2) === 0 : tickYear % 100 === 0,
    });
    lastYear = tickYear;
    p = Math.max(pos + minDp, p + minDp / 4);
  }
  // Endpoint labels.
  ticks.unshift({ position: 0, label: '300k BCE', major: true });
  ticks.push({ position: 1, label: 'Present', major: true });
  // Drop ticks crowding the endpoints.
  return ticks.filter(
    (t, i) =>
      i === 0 ||
      i === ticks.length - 1 ||
      (t.position > minDp * 0.9 && t.position < 1 - minDp * 0.9),
  );
}
