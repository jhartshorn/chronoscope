import { describe, expect, it } from 'vitest';
import {
  dateToSliderPosition,
  generateTicks,
  sliderPositionToDate,
  yearsPerSliderUnit,
} from './timescale';
import { hd, PRESENT_YEAR, TIMELINE_END_YEAR, TIMELINE_START_YEAR } from './date';

describe('non-linear timescale', () => {
  it('anchors the endpoints', () => {
    expect(sliderPositionToDate(0).year).toBeCloseTo(TIMELINE_START_YEAR, 0);
    expect(sliderPositionToDate(1).year).toBeCloseTo(TIMELINE_END_YEAR, 3);
  });

  it('is a mathematical inverse to tight tolerance (position round-trip)', () => {
    for (let i = 0; i <= 100; i++) {
      const p = i / 100;
      const back = dateToSliderPosition(sliderPositionToDate(p));
      expect(back).toBeCloseTo(p, 6);
    }
  });

  it('is a mathematical inverse (date round-trip across the whole span)', () => {
    const years = [
      TIMELINE_START_YEAR, -250_000, -100_000, -10_000, -3000, 1 - 44, 1, 1066, 1492, 1945, 2000, PRESENT_YEAR,
    ];
    for (const y of years) {
      const back = sliderPositionToDate(dateToSliderPosition(hd(y))).year;
      expect(back).toBeCloseTo(y, 3);
    }
  });

  it('is strictly monotonic (later positions => later dates)', () => {
    let prev = -Infinity;
    for (let i = 0; i <= 500; i++) {
      const y = sliderPositionToDate(i / 500).year;
      expect(y).toBeGreaterThan(prev);
      prev = y;
    }
  });

  it('gives deep prehistory a much coarser scale than the present', () => {
    const deep = yearsPerSliderUnit(0.05);
    const recent = yearsPerSliderUnit(0.98);
    // Deep prehistory should cover orders of magnitude more years per unit.
    expect(deep).toBeGreaterThan(recent * 50);
  });

  it('clamps positions outside [0,1]', () => {
    expect(sliderPositionToDate(-1).year).toBeCloseTo(TIMELINE_START_YEAR, 0);
    expect(sliderPositionToDate(2).year).toBeCloseTo(TIMELINE_END_YEAR, 3);
    expect(dateToSliderPosition(hd(TIMELINE_START_YEAR - 100_000))).toBe(0);
  });

  it('generates ascending ticks with endpoint labels', () => {
    const ticks = generateTicks(1200);
    expect(ticks.length).toBeGreaterThan(5);
    expect(ticks[0].label).toMatch(/300k BCE/);
    expect(ticks[ticks.length - 1].label).toMatch(/Present/);
    for (let i = 1; i < ticks.length; i++) {
      expect(ticks[i].position).toBeGreaterThan(ticks[i - 1].position);
    }
  });
});
