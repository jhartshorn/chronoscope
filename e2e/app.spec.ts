import { expect, test } from '@playwright/test';

test.describe('Chronoscope', () => {
  test('loads a styled map with no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    await page.goto('/');
    await expect(page.locator('.brand h1')).toHaveText('Chronoscope');
    await expect(page.locator('canvas.map-canvas')).toBeVisible();
    await expect(page.locator('.date-display')).toContainText('BCE');
    // Canvas actually drew something (center pixel is not transparent).
    const drawn = await page.evaluate(() => {
      const c = document.querySelector('canvas') as HTMLCanvasElement;
      const d = c.getContext('2d')!.getImageData(c.width / 2, c.height / 2, 1, 1).data;
      return d[3] > 0;
    });
    expect(drawn).toBe(true);
    expect(errors).toEqual([]);
  });

  test('has all six playback speeds and a play button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.speed-group button')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });

  test('playback controls collapse behind the toggle button', async ({ page }) => {
    await page.goto('/');
    const speed = page.getByRole('button', { name: 'Speed 10 times' });
    const toggle = page.getByRole('button', { name: /speed and loop controls/ });
    // Open by default on desktop viewport.
    await expect(speed).toBeVisible();
    await toggle.click(); // hide
    await expect(speed).toBeHidden();
    await toggle.click(); // show again
    await expect(speed).toBeVisible();
    // Play/pause stays reachable regardless of the panel state.
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });

  test('play then pause via keyboard (Space)', async ({ page }) => {
    await page.goto('/');
    await page.locator('canvas').click({ position: { x: 700, y: 180 } });
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });

  test('dragging the slider changes the displayed date', async ({ page }) => {
    await page.goto('/');
    const before = await page.locator('.date-display').textContent();
    const track = page.locator('.slider-track');
    const box = (await track.boundingBox())!;
    await page.mouse.click(box.x + box.width * 0.92, box.y + box.height / 2);
    const after = await page.locator('.date-display').textContent();
    expect(after).not.toBe(before);
    // Far right should be recent (CE / Present).
    expect(after).toMatch(/CE|Present|1\d{3}|20\d{2}/);
  });

  test('arrow keys on the slider move through time', async ({ page }) => {
    await page.goto('/');
    const handle = page.locator('.slider-handle');
    await handle.focus();
    const before = await handle.getAttribute('aria-valuenow');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const after = await handle.getAttribute('aria-valuenow');
    expect(Number(after)).toBeGreaterThan(Number(before));
  });

  test('speed change updates the active button', async ({ page }) => {
    await page.goto('/');
    const tenx = page.getByRole('button', { name: 'Speed 10 times' });
    await tenx.click();
    await expect(tenx).toHaveAttribute('aria-pressed', 'true');
  });

  test('clicking a territory opens an info panel that can be closed', async ({ page }) => {
    await page.goto('/');
    // Jump to 117 CE where large empires are present.
    await page.evaluate(() => (window as any).__setYear(117));
    await page.waitForTimeout(400);
    // Click over the Roman Mediterranean region.
    await page.locator('canvas').click({ position: { x: 760, y: 250 } });
    const panel = page.locator('.info-panel');
    await expect(panel).toBeVisible({ timeout: 3000 });
    await expect(panel.locator('.disclaimer')).toContainText(/approximate/i);
    await page.locator('.panel-close').first().click();
    await expect(panel).toBeHidden();
  });

  test('search finds an empire and opens its panel', async ({ page }) => {
    await page.goto('/');
    await page.locator('.search input').fill('mongol');
    await page.locator('.search-results li button').first().click();
    await expect(page.locator('.info-panel h2')).toContainText(/Mongol/);
  });

  test('methodology page opens and documents uncertainty', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open methodology' }).click();
    const modal = page.getByRole('dialog', { name: 'Methodology and uncertainty' });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/non-linear timeline/i);
    await expect(modal).toContainText(/Continuity is not identity/i);
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('visible-entities list toggles and lists content', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).__setYear(2020));
    await page.getByRole('button', { name: 'Toggle visible list' }).click();
    const list = page.getByRole('region', { name: 'Currently visible on the map' });
    await expect(list).toBeVisible();
    await expect(list).toContainText(/Entities/);
  });

  test('reset-to-world-view control is present and clickable', async ({ page }) => {
    await page.goto('/');
    const reset = page.getByRole('button', { name: 'Reset to world view' });
    await expect(reset).toBeVisible();
    await reset.click();
  });

  test('loop toggle can be enabled', async ({ page }) => {
    await page.goto('/');
    const loop = page.getByRole('checkbox').first();
    await loop.check();
    await expect(loop).toBeChecked();
  });
});
