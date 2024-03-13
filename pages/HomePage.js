class HomePage {
  constructor(page) {
    this.page = page;
    this.homeText = page.getByRole("heading", { name: "Home" });
    this.tweetButton = page.getByRole("button", { name: "Tweet" });
    this.tweetModalButton = page
      .getByRole("button", { name: "Tweet", exact: true })
      .nth(1);
    this.tweetTextArea = page.getByPlaceholder("What's happening?");
    this.tweetText = page.getByText("Example tweet").first();
    this.tinchoProfile = page.getByText("@Tincho");
    this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
    this.showMoreLink = page.getByText("Show more");
    this.uploadImage = page
      .locator('input[type="file"]')
      .setInputFiles("../data/testImage.jpeg");
  }
  async tweet() {
    this.tweetModalButton.click();
  }

  async tweetMessage(message) {
    this.tweetButton.click();
    await this.page.waitForSelector(".sc-ftLKQv");
    this.tweetTextArea.fill(message);
  }

//   async tweetImage() {
//     await this.uploadImage;
//   }

  async followTincho() {
    this.followTinchoButton.click();
  }

  async clickShowMore() {
    this.showMoreLink.click();
  }
}

module.exports = HomePage;
