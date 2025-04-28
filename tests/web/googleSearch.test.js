const { test, expect } = require('@playwright/test');
const GoogleHomePage = require('../../pages/GoogleHomePage');

test.describe('TC001 - Google Search Test', () => {
  test('Search for Playwright and validate title', async ({ page }) => {
    const google = new GoogleHomePage(page);
    await google.navigate();
    await google.acceptConsentIfPresent();
    await google.search('Playwright');
    await expect(page).toHaveTitle(/Playwright/);
  });
});
