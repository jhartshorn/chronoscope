import { test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

/**
 * Produces the documentation screenshots at several representative dates.
 * Run with: npm run screenshots  (outputs to ./screenshots)
 */
const DATES: { year: number; slug: string; label: string }[] = [
  { year: 1 - 120_000, slug: '01-deep-prehistory', label: '120,000 BCE' },
  { year: 1 - 5000, slug: '02-neolithic', label: '5000 BCE' },
  { year: 117, slug: '03-antiquity-rome-han', label: '117 CE' },
  { year: 1279, slug: '04-mongol-empire', label: '1279 CE' },
  { year: 1680, slug: '05-early-modern', label: '1680 CE' },
  { year: 2020, slug: '06-modern', label: '2020 CE' },
];

test('capture documentation screenshots', async ({ page }) => {
  mkdirSync('screenshots', { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForTimeout(800);
  for (const d of DATES) {
    await page.evaluate((y) => (window as any).__setYear(y), d.year);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `screenshots/${d.slug}.png` });
  }
});
