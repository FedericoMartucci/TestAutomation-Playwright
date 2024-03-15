const {expect} = require("@playwright/test");

class RecommendationsPage {

  url = "https://frontend-training-taupe.vercel.app/connect"

  constructor(page) {
    this.page = page;
    this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
    // this.unfollowTinchoButton = page.getByText('Unfollow');
    this.tinchoProfile = page.getByText("@Tincho");
  }
  
  async goto() {
    await this.page.goto(this.url)
  }

  async followTincho() {
    await this.followTinchoButton.click();
    await expect(await this.tinchoProfile).not.toBeVisible()
  }
}

module.exports = RecommendationsPage;
  