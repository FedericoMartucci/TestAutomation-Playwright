class RecommendationsPage {
    constructor(page) {
      this.page = page;
      this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
      this.tinchoProfile = page.getByText("@Tincho");
    }
  
    async followTincho() {
      this.followTinchoButton.click();
    }
  }
  
  module.exports = RecommendationsPage;
  