// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
module.exports = defineConfig({
  timeout: 60000,
  retries: 0,
  testDir: './tests',
  outputDir: 'test-results',
    reporter: [
      ['allure-playwright', {
        outputFolder: 'allure-results',  // Folder to store allure report data
        suiteTitle: true                  // Optionally use suite titles
      }]
    ],
    use: {
      baseURL: process.env.BASE_URL,
      headless: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure'
    },
  // Set the number of workers for parallel execution
  workers: process.env.CI ? 4 : 2,  // Use 4 workers in CI, 2 in local dev
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] }
    },
  ]
});