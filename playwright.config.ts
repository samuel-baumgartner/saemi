import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3087';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: '**/*.spec.ts',
  timeout: 120_000,
  expect: { timeout: 30_000 },
  workers: 1,
  outputDir: process.env.REMOTE_OUTPUT_DIR ? path.join(process.env.REMOTE_OUTPUT_DIR, 'browser-results') : 'test-results',
  reporter: 'line',
  use: {
    baseURL,
    actionTimeout: 30_000,
    headless: true,
    contextOptions: { reducedMotion: 'reduce' },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'] },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3087',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
