import { TIMELINE_END_YEAR, TIMELINE_START_YEAR } from './date';

/**
 * The coarse eras used for the timeline's period-focus control. Boundaries
 * mirror the finer era tag in `Timeline.tsx` (which further splits
 * Prehistory into Palaeolithic/Neolithic for the live date read-out),
 * merged down to the eras a user would actually want to jump between.
 */
export interface Period {
  id: string;
  label: string;
  /** Astronomical start year (inclusive). */
  startYear: number;
}

export const PERIODS: Period[] = [
  { id: 'prehistory', label: 'Prehistory', startYear: TIMELINE_START_YEAR },
  { id: 'bronze-age', label: 'Bronze Age', startYear: -3200 },
  { id: 'antiquity', label: 'Antiquity', startYear: -800 },
  { id: 'medieval', label: 'Mediaeval', startYear: 500 },
  { id: 'early-modern', label: 'Early Modern', startYear: 1500 },
  { id: 'modern', label: 'Modern', startYear: 1800 },
];

/** End year (exclusive) of a period: the next period's start, or the timeline end. */
export function periodEndYear(period: Period): number {
  const i = PERIODS.indexOf(period);
  return i >= 0 && i < PERIODS.length - 1 ? PERIODS[i + 1].startYear : TIMELINE_END_YEAR;
}
