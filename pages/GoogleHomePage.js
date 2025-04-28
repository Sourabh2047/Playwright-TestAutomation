class GoogleHomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[name="q"]');
    this.searchResults = page.locator('#search');
    this.consentButton = page.locator('button:has-text("I agree")');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async acceptConsentIfPresent() {
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.searchResults.waitFor();
  }
}

module.exports = GoogleHomePage;
