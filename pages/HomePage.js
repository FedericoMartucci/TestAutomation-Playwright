const {expect} = require("@playwright/test");

class HomePage {

  // this could be replaced with any i18n package,
  // but we only have two languages for now

  constructor(page, english = true) {
    this.page = page;
    this.english = english
    this.homeText = page.getByRole("heading", {name: this.english ? "Home" : "Inicio"});
    this.tweetButton = page.getByRole("button", {name: this.english ? "Tweet" : "Publicar"});
    this.tweetModalButton = page
      .getByRole("button", {name: this.english ? "Tweet" : "Publicar", exact: true})
      .nth(1);
    this.tweetTextArea = page.getByPlaceholder(this.english ? "What's happening?" : "Que hay de nuevo?");
    // this.tweetText = page.getByText("Example tweet").first();
    // this.tinchoProfile = page.getByText("Tincho").first();
    // this.tinchoUser = page.getByText("@Tincho");
    // this.followTinchoButton = page.locator('button[mode="follow"]').nth(0);
    this.showMoreLink = page.getByText(this.english ? "Show more" : "Mostrar mas");
    this.messageButton = page.getByText(this.english ? "Message" : "Mensajes");
    this.threeDotsButton = page
      .locator('img[alt="dot"]')
      .first();
    this.firstLogoutButton = page.getByText(this.english ? "Log out @federicoMartucci03" : "Cerrar sesion de @federicoMartucci03");
    this.switchToSpanishButton = page.getByText("Switch to Spanish");
    this.switchToEnglishButton = page.getByText("Cambiar a Ingles");
    this.modalLogoutButton = page.getByRole("button", {name: this.english ? "Log out" : "Cerrar sesion"});
    this.retweetButton = page.locator('button img[alt="retweet-icon"]').first();
    this.retweetCounter = page.locator(
      'div:has(> button img[alt="retweet-icon"]) label'
    ).nth(1);
    // this.uploadImage = page
    //   .locator('input[type="file"]')
    //   .setInputFiles("../data/testImage.jpeg");
    this.whoToFollowContainer = page.locator("div", {has: page.locator('text="Who to follow"')})
  }

  // async tweet() {
  //   await this.tweetModalButton.click();
  //   await expect(await this.tweetText).toBeVisible();
  // }

  async tweetMessage(message) {
    await this.tweetButton.click();
    // await this.page.waitForSelector(".sc-ftLKQv");
    await this.tweetTextArea.fill(message);
    await this.tweetModalButton.click();
    await expect(await this.page.getByText(message)).toBeVisible();
  }

  //   async tweetImage() {
  //     await this.uploadImage;
  //   }

  async followUser({username}) {
    const usernameLabel = this.page.getByText(`@${username}`);
    const userFollowButton = await this.findUserFollowButtonByUsername(username);

    await expect(await usernameLabel).toBeVisible()
    await userFollowButton.click()
    await expect(await usernameLabel).not.toBeVisible()
  }

  async findUserFollowButtonByUsername(username) {
    // from the container, looks for the children which has a direct button element,
    // then filters those by username and
    // then selects the button element of that filtered div
    return this.whoToFollowContainer.locator('div:has(> button)')
      .filter({has: this.page.getByText(username)}).getByText('Follow');
  }

// async followTincho() {
  //   await expect(await this.tinchoUser).toBeVisible();
  //   await this.followTinchoButton.click();
  //   await expect(await this.tinchoUser).not.toBeVisible();
  // }

  async goToUserProfile({username}) {
    const userProfileButton = this.page.getByText(username).first();
    await userProfileButton.click()
  }

  // async goTinchoProfile() {
  //   this.tinchoProfile.click();
  // }

  async goToRecommendations() {
    await this.showMoreLink.click();
    await this.page.waitForURL('https://frontend-training-taupe.vercel.app/connect')
  }

  async clickMessages() {
    await this.messageButton.click();
  }

  async clickThreeDots() {
    await this.threeDotsButton.click();
  }

  async logout() {
    await this.threeDotsButton.click();
    await this.firstLogoutButton.click();
    await this.modalLogoutButton.click();
    await this.page.waitForURL('https://frontend-training-taupe.vercel.app/login')
  }

  // async clickFirstLogoutButton() {
  //   await this.firstLogoutButton.click();
  // }

  async switchToSpanish() {
    await this.switchToSpanishButton.click();
  }

  async switchToEnglish() {
    await this.switchToEnglishButton.click();
  }

  // async clickLastLogoutButton() {
  //   await this.modalLogoutButton.click();
  // }

  async retweet() {
    await this.retweetButton.click();
  }

  async cancelRetweet() {
    await this.retweetButton.click();
  }
}

module.exports = HomePage;
