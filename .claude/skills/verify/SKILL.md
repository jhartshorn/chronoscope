---
name: verify
description: How to run and observe Chronoscope to verify changes end-to-end (dev server + Playwright driver + __setYear hook).
---

# Verifying Chronoscope changes

1. Dev server: `npm run dev` serves http://localhost:5178/ (fixed port). Check
   with `curl -s -o /dev/null -w "%{http_code}" http://localhost:5178/` before
   starting a second one.
2. Drive the real app with a scratch Playwright script (chromium is already
   installed for e2e). Import via
   `createRequire('/path/to/repo/package.json')('@playwright/test')` if the
   script lives outside the repo.
3. The app exposes `window.__setYear(year)` (astronomical year: negative/0 for
   BCE) — set the date deterministically, wait ~800ms for fades, then
   `page.screenshot()`. See `e2e/screenshots.spec.ts` for the idiom.
4. Zoom with `page.mouse.wheel` over the canvas; hover/click hit-tests
   entities and shows a tooltip/panel — good for checking a specific polygon
   resolves to the right entity.
5. Gotchas observed: Natural Earth 110m has separate polygons for Somaliland,
   N. Cyprus, Kosovo, Palestine, W. Sahara, Greenland etc. — a state whose NE
   polygon excludes one of these leaves a visible hole; check the rendered map,
   not just the data tests. Console errors surface via `page.on('pageerror')`.
