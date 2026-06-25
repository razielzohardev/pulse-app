import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnvConfig } from './src/config/environments';

// Load variables from .env (local dev). In CI they come from secrets.
dotenv.config();


/**
 * Resolve which environment to target.
 * Usage: TEST_ENV=testing npx playwright test
 * Falls back to "dev" locally.
 */
const env = getEnvConfig();
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  // Run every file in parallel, and tests within a file in parallel too.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source.
  forbidOnly: isCI,

  retries: 3,

  // Limit workers on CI for stable, reproducible runs.
  workers: isCI ? 2 : undefined,

  // Global timeouts — generous enough for a cold Vercel start, tight enough to catch hangs.
  timeout: 30_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ...(isCI ? [['github'] as const] : []),
  ],

  use: {
    baseURL: env.baseURL,

    // Collect a trace on the first retry — invaluable for debugging flakes.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // The app is RTL Hebrew — set locale/timezone so date & number rendering is deterministic.
    locale: 'he-IL',
    timezoneId: 'Asia/Jerusalem',

    launchOptions: {
      slowMo: parseInt(process.env.PWSLOW ?? '0'),
    },

    // A real action timeout instead of waiting the full test timeout for a stuck click.
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },

  projects: [
    // 1) Auth setup project — logs in once and saves the storage state.
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // 2) Real browser projects. Each depends on setup so auth state is ready.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit', // Safari engine
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});
