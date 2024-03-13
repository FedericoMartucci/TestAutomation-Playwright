class RecommendationsPage {
    constructor(page) {
      this.page = page;
      this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
    }
  
    async followTincho() {
      this.followTinchoButton.click();
    }
  }
  
  module.exports = RecommendationsPage;
  