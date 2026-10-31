import { test, expect, type Locator, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';

const hash = async (canvas: Locator) => createHash('sha256').update(await canvas.screenshot()).digest('hex');
const uncaughtErrors = new WeakMap<Page, string[]>();

async function readyCanvas(canvas: Locator) {
  await expect(canvas).toBeVisible();
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(() => canvas.evaluate(element => {
    const gl = (element as HTMLCanvasElement).getContext('webgl2');
    return !!gl && !gl.isContextLost();
  })).toBe(true);
}

async function drag(page: Page, canvas: Locator, mobile: boolean, hold = 0) {
  await canvas.scrollIntoViewIfNeeded();
  const box = (await canvas.boundingBox())!;
  const start = { x: box.x + box.width * 0.4, y: box.y + box.height * 0.45 };
  const end = { x: box.x + box.width * 0.75, y: box.y + box.height * 0.5 };
  if (mobile) {
    const client = await page.context().newCDPSession(page);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...start, id: 0 }] });
    for (let step = 1; step <= 8; step++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x + (end.x - start.x) * step / 8, y: start.y + (end.y - start.y) * step / 8, id: 0 }] });
    }
    if (hold) await page.waitForTimeout(hold);
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await client.detach();
  } else {
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 8 });
    if (hold) await page.waitForTimeout(hold);
    await page.mouse.up();
    await page.mouse.move(0, 0);
  }
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('https://www.youtube.com/**', route => route.fulfill({ contentType: 'text/html', body: '<p>Video embed</p>' }));
  // Test our embed/navigation independently of YouTube's autoplay and bot policies.
  uncaughtErrors.set(page, errors);
});

test.afterEach(async ({ page }) => {
  expect(uncaughtErrors.get(page)).toEqual([]);
});

test('project links use dedicated pages; inline galleries and education details work', async ({ page }, info) => {
  const models: string[] = [];
  page.on('request', request => { if (request.url().endsWith('.glb')) models.push(request.url()); });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Quick preview/i })).toHaveCount(0);
  await page.getByRole('button', { name: /ETH Electrical Engineering/ }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  expect(models).toEqual([]);
  await page.locator('[data-project-id="remote-ball"] a').click();
  await expect(page).toHaveURL(/\/projects\/remote-ball$/);
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toHaveCount(0);

  await page.goto('/');
  await page.getByRole('link', { name: 'Explore the project', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/provincia$/);
  const gallery = page.getByRole('region', { name: 'Images & interactive demos' });
  await expect(gallery.getByRole('status')).toHaveText('1 / 6');
  await gallery.getByRole('button', { name: 'Next media', exact: true }).click();
  await expect(gallery.locator('figure img')).toHaveAttribute('alt', 'Water infrastructure: an aqueduct through the settlement');
  await gallery.getByRole('button', { name: 'Previous media', exact: true }).click();
  await expect(gallery.getByRole('status')).toHaveText('1 / 6');
  await gallery.getByRole('button', { name: 'Previous media', exact: true }).click();
  await expect(gallery.getByRole('status')).toHaveText('6 / 6');
  await gallery.getByRole('button', { name: /^View media 3:/ }).click();
  await expect(gallery.getByRole('button', { name: /^View media 3:/ })).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => gallery.locator('figure img').evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
  await gallery.screenshot({ path: info.outputPath('inline-gallery.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.goto('/projects/nasa-hack');
  await gallery.getByRole('button', { name: 'View media 4: Video' }).click();
  await expect(gallery.locator('iframe')).toHaveAttribute('src', 'https://www.youtube.com/embed/XYicrR4ybDM?start=25');
  await gallery.getByRole('button', { name: /^View media 1:/ }).click();
  await expect(gallery.locator('iframe')).toHaveCount(0);
  await expect(gallery.locator('figure img')).toBeVisible();
});

test('spherical robot renders and rotates with mouse or touch', async ({ page, isMobile }, info) => {
  await page.goto('/projects/remote-ball');
  const canvas = page.locator('#project-gallery canvas');
  await readyCanvas(canvas);
  const before = await hash(canvas);
  await drag(page, canvas, isMobile);
  await expect.poll(() => hash(canvas)).not.toBe(before);
  await canvas.screenshot({ path: info.outputPath('spherical-robot-rotated.png') });
});

test('ball-on-plate orbit, zoom, reset, replay, policy, and media switching work', async ({ page, isMobile }, info) => {
  await page.goto('/projects/ball-on-plate');
  const gallery = page.getByRole('region', { name: 'Images & interactive demos' });
  const viewer = page.getByRole('region', { name: 'Interactive Ball-on-Plate simulation', exact: true });
  const canvas = viewer.locator('canvas');
  const reset = viewer.getByRole('button', { name: 'Reset camera', exact: true });
  await expect(reset).toBeEnabled();
  await readyCanvas(canvas);
  // Establish the reset view after the first render and scroll/layout updates.
  await reset.click();
  const initial = await hash(canvas);
  await canvas.screenshot({ path: info.outputPath('ball-on-plate-initial.png') });
  await drag(page, canvas, isMobile);
  await expect.poll(() => hash(canvas)).not.toBe(initial);
  await reset.click();
  await canvas.screenshot({ path: info.outputPath('ball-on-plate-reset.png') });
  await expect.poll(() => hash(canvas)).toBe(initial);
  await canvas.focus();
  const focused = await hash(canvas);
  await page.keyboard.press('+');
  await expect.poll(() => hash(canvas)).not.toBe(focused);
  await reset.click();
  await expect.poll(() => hash(canvas)).toBe(initial);

  if (isMobile) {
    await viewer.getByRole('button', { name: /Show neural policy/ }).click();
    await expect(viewer.getByRole('button', { name: /Hide neural policy/ })).toHaveAttribute('aria-expanded', 'true');
    await viewer.getByRole('button', { name: /Hide neural policy/ }).click();
  } else {
    await expect(viewer.getByRole('group', { name: /SAC neural network/ })).toBeVisible();
  }
  await canvas.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const progress = viewer.getByRole('progressbar', { name: 'Replay progress' });
  await expect.poll(async () => Number(await progress.getAttribute('aria-valuenow'))).toBeGreaterThan(0);
  await expect.poll(() => hash(canvas)).not.toBe(initial);
  await canvas.screenshot({ path: info.outputPath('ball-on-plate-replay.png') });

  await gallery.getByRole('button', { name: 'Next media', exact: true }).click();
  await expect(gallery.locator('canvas')).toHaveCount(0);
  await expect(gallery.locator('figure img')).toHaveAttribute('alt', 'RRT* path tree with ball-radius clearance around the planned trajectory');
  await gallery.getByRole('button', { name: 'Previous media', exact: true }).click();
  await expect(reset).toBeEnabled();
  await readyCanvas(canvas);
});

test('plate responds to pointer input, ball moves, and recenter resets it', async ({ page, isMobile }, info) => {
  await page.goto('/projects/ball-on-plate');
  const playground = page.getByRole('region', { name: 'Test the plate yourself', exact: true });
  await playground.getByRole('button', { name: 'Start interactive demo', exact: true }).click();
  const recenter = playground.getByRole('button', { name: 'Recenter ball', exact: true });
  await expect(recenter).toBeEnabled();
  const canvas = playground.locator('canvas');
  await readyCanvas(canvas);
  await expect(page.locator('#project-gallery canvas')).toHaveCount(0);
  await recenter.click();
  const centered = await hash(canvas);
  await drag(page, canvas, isMobile, 1200);
  await expect.poll(() => hash(canvas)).not.toBe(centered);
  await canvas.screenshot({ path: info.outputPath('ball-moved-after-tilt.png') });
  await recenter.click();
  await expect.poll(() => hash(canvas)).toBe(centered);
  await canvas.screenshot({ path: info.outputPath('ball-recentered.png') });
});
