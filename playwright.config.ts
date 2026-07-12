import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5178',
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5178',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
