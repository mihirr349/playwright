import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {

    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
  },


});
