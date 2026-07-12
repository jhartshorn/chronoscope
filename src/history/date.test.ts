import { describe, expect, it } from 'vitest';
import { formatDate, formatRange, hd, isBCE, parseDate, toBCEYear } from './date';

describe('date model', () => {
  it('formats CE years plainly', () => {
    expect(formatDate(hd(1066))).toBe('1066');
    expect(formatDate(hd(1945))).toBe('1945');
    expect(formatDate(hd(476), { months: false })).toBe('476 CE');
  });

  it('formats BCE years with rounding by magnitude', () => {
    expect(formatDate(hd(1 - 44))).toBe('44 BCE'); // 44 BCE
    expect(formatDate(hd(1 - 1066))).toBe('1,066 BCE'); // < 3000 BCE: shown to the year
    expect(formatDate(hd(1 - 5300))).toBe('5,300 BCE'); // >= 3000 BCE: rounded to century
    expect(formatDate(hd(1 - 250_000))).toBe('250,000 BCE');
    expect(formatDate(hd(1 - 10_000))).toBe('10,000 BCE');
  });

  it('NEVER displays a year zero — astronomical 0 renders as 1 BCE', () => {
    expect(formatDate(hd(0))).toBe('1 BCE');
    expect(isBCE(hd(0))).toBe(true);
    expect(toBCEYear(0)).toBe(1);
  });

  it('converts BCE and CE correctly across the boundary', () => {
    expect(toBCEYear(0)).toBe(1); // year 0 -> 1 BCE
    expect(toBCEYear(-1)).toBe(2); // year -1 -> 2 BCE
    expect(parseDate('1 BCE').year).toBe(0);
    expect(parseDate('2 BCE').year).toBe(-1);
    expect(parseDate('44 BCE').year).toBe(-43);
    expect(parseDate('1 CE').year).toBe(1);
  });

  it('parses a range of textual dates', () => {
    expect(parseDate('300,000 BCE').year).toBe(1 - 300_000);
    expect(parseDate('250k BCE').year).toBe(1 - 250_000);
    expect(parseDate('1066').year).toBe(1066);
    expect(parseDate('1945 CE').year).toBe(1945);
  });

  it('rejects a year zero on parse', () => {
    expect(() => parseDate('0 BCE')).toThrow(/no year zero/i);
    expect(() => parseDate('0 CE')).toThrow(/no year zero/i);
  });

  it('shows months for recent fractional dates', () => {
    expect(formatDate(hd(1969.54))).toBe('July 1969');
    expect(formatDate(hd(1945.0), { months: true })).toBe('1945');
  });

  it('shows "Present day" near the end', () => {
    expect(formatDate(hd(2026.5))).toBe('Present day');
  });

  it('formats ranges', () => {
    expect(formatRange(hd(1 - 27), hd(476))).toBe('27 BCE – 476 CE');
  });
});
