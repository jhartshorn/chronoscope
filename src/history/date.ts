import type { HistoricalDate, HistoricalDuration } from '../types';

/**
 * Date model.
 *
 * Internally a date is a single continuous number (`year`, astronomical
 * convention: 0 = 1 BCE, -1 = 2 BCE, 1066 = 1066 CE). No JavaScript Date
 * objects are involved, so 300,000 BCE is as valid as last Tuesday.
 *
 * Display rules:
 *  - There is no displayed year zero: astronomical year 0 renders as "1 BCE".
 *  - Deep prehistory rounds to sensible magnitudes ("250,000 BCE").
 *  - Recent fractional years render months ("March 1945").
 */

export const PRESENT_YEAR = 2026;
export const TIMELINE_START_YEAR = -299_999; // 300,000 BCE
export const TIMELINE_END_YEAR = PRESENT_YEAR + 0.53; // "present day", mid-2026

export function hd(year: number): HistoricalDate {
  return { year };
}

export function years(n: number): HistoricalDuration {
  return { years: n };
}

/** BCE display year for astronomical year <= 0 (no year zero). */
export function toBCEYear(astronomicalYear: number): number {
  return 1 - astronomicalYear;
}

export function isBCE(date: HistoricalDate): boolean {
  return date.year <= 0;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function group(n: number): string {
  return Math.round(n).toLocaleString('en-GB');
}

export interface FormatOptions {
  /** Show month for recent fractional dates (default true). */
  months?: boolean;
  /** Compact form for tick labels ("250k BCE"). */
  compact?: boolean;
}

/**
 * Format a date for display. Never shows a year zero.
 */
export function formatDate(date: HistoricalDate, opts: FormatOptions = {}): string {
  const { months = true, compact = false } = opts;
  const y = date.year;

  if (y >= TIMELINE_END_YEAR - 0.05) return 'Present day';

  if (y <= 0) {
    // BCE. Round according to magnitude — precision would be false here.
    const bce = toBCEYear(y);
    let rounded: number;
    if (bce >= 100_000) rounded = Math.round(bce / 1000) * 1000;
    else if (bce >= 20_000) rounded = Math.round(bce / 500) * 500;
    else if (bce >= 3_000) rounded = Math.round(bce / 100) * 100;
    else rounded = Math.round(bce);
    if (compact && rounded >= 10_000) {
      const k = rounded / 1000;
      return `${Number.isInteger(k) ? k : k.toFixed(1)}k BCE`;
    }
    return `${group(rounded)} BCE`;
  }

  const whole = Math.floor(y);
  const frac = y - whole;
  // Month-level display only where the data scale supports it (last ~500 y).
  if (months && y > PRESENT_YEAR - 500 && frac > 1 / 24) {
    const m = Math.min(11, Math.floor(frac * 12));
    return `${MONTHS[m]} ${whole}`;
  }
  if (whole < 1000) return `${whole} CE`;
  return `${whole}`;
}

/** Format a date range, e.g. "c. 3100 BCE – 30 BCE". */
export function formatRange(start: HistoricalDate, end: HistoricalDate): string {
  return `${formatDate(start, { months: false })} – ${formatDate(end, { months: false })}`;
}

/**
 * Parse strings like "300,000 BCE", "44 BCE", "1066", "1945 CE" into a
 * HistoricalDate. Used by the data-import format and tests.
 */
export function parseDate(text: string): HistoricalDate {
  const t = text.trim().toLowerCase().replace(/,/g, '');
  if (t === 'present' || t === 'present day') return hd(TIMELINE_END_YEAR);
  const m = t.match(/^(\d+(?:\.\d+)?)\s*(k)?\s*(bce|bc|ce|ad)?$/);
  if (!m) throw new Error(`Unparseable historical date: "${text}"`);
  let n = parseFloat(m[1]);
  if (m[2]) n *= 1000;
  const era = m[3];
  if (era === 'bce' || era === 'bc') {
    if (n === 0) throw new Error('There is no year zero');
    return hd(1 - n);
  }
  if (n === 0) throw new Error('There is no year zero');
  return hd(n);
}

export function clampToTimeline(date: HistoricalDate): HistoricalDate {
  return hd(Math.min(TIMELINE_END_YEAR, Math.max(TIMELINE_START_YEAR, date.year)));
}

/** Years before the timeline's "present" endpoint. */
export function yearsBeforePresent(date: HistoricalDate): number {
  return TIMELINE_END_YEAR - date.year;
}
