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
    this.tinchoProfile = page.getByText("Tincho").first();
    this.tinchoUser = page.getByText("@Tincho");
    this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
    this.showMoreLink = page.getByText("Show more");
    this.messageButton = page.getByText("Message");
    this.threeDotsButton = page
      .locator('.sc-jOHGOj.jaNlsc img[alt="dot"]')
      .first();
    this.firstLogoutButton = page.getByText("Log out @federicoMartucci03");
    this.switchToSpanishButton = page.getByText("Switch to Spanish");
    this.switchToEnglishButton = page.getByText("Cambiar a Ingles");
    this.lastLogoutButton = page.getByRole("button", { name: "Log out" });
    this.retweetButton = page.locator('button img[alt="retweet-icon"]').first();
    this.retweetCounter = page.locator(
      'div:has(> button img[alt="retweet-icon"]) label'
    ).nth(1);
    // this.uploadImage = page
    //   .locator('input[type="file"]')
    //   .setInputFiles("../data/testImage.jpeg");
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

  async goTinchoProfile() {
    this.tinchoProfile.click();
  }

  async clickShowMore() {
    this.showMoreLink.click();
  }

  async clickMessages() {
    this.messageButton.click();
  }

  async clickThreeDots() {
    this.threeDotsButton.click();
  }

  async clickFirstLogoutButton() {
    this.firstLogoutButton.click();
  }

  async switchToSpanish() {
    this.switchToSpanishButton.click();
  }
  async switchToEnglish() {
    this.switchToEnglishButton.click();
  }

  async clickLastLogoutButton() {
    this.lastLogoutButton.click();
  }

  async retweet() {
    this.retweetButton.click();
  }

  async cancelRetweet() {
    this.retweetButton.click();
  }
}

module.exports = HomePage;
