/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, devices } from '@playwright/test';

/* Read environment variables from file. https://github.com/motdotla/dotenv */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Directory to search for tests */
  testDir: 'tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests 2 times on CI, 1 time locally */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Directory to output test results */
  outputDir: './test-results',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    /* Generate a custom HTML report using Monocart, see https://github.com/cenfun/monocart-reporter */
    ['monocart-reporter', {
      name: "User Acceptance Test - Execution Report",
      outputFile: './test-results/report.html',
      // Custom columns
      columns: (defaultColumns: any[]) => {
        // Insert custom column(s) before a default column, in this case 'duration'
        const index = defaultColumns.findIndex((column) => column.id === 'duration');
        defaultColumns.splice(index, 0, {
          // Column for JIRA ticket link
          id: 'jira',
          name: 'JIRA Key',
          width: 80,
          searchable: true,
          styleMap: 'font-weight:normal;',
          formatter: (v: any, rowItem: { [x: string]: any; }, columnItem: { id: string | number; }) => {
            const key = rowItem[columnItem.id];
            return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
          }
        });
      }
    }
    ]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:8000',
    /* Whether to run browser in headless mode. */
    headless: true,

    /* **** Record options **** */
    /* Record trace locally only when retrying a test for the first time. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'off' : 'on-first-retry',
    /* Record screenshots on CI only when tests fail. */
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    /* Record video locally only when retrying a test for the first time. */
    // video: process.env.CI ? 'off' : 'on-first-retry',

    /* Launch options to use. See https://playwright.dev/docs/api/class-browsertype */
    launchOptions: {
      /* Slow down Playwright operations by the specified amount of milliseconds. */
      // slowMo: 2_000
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start-server',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    stderr: 'ignore',
  },
});
