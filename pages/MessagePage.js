class MessagePage {
  constructor(page) {
    this.page = page;
    this.lautaroProfile = page.getByText("LautaroGNM").first();
    this.messageInput = page.getByPlaceholder("Start a new message");
    this.sendMessageButton = page.locator(
      'button img[alt="message-send-button"]'
    );
  }

  async clickUser() {
    await this.lautaroProfile.click();
  }

  async writeMessage(message) {
    await this.messageInput.fill(message);
  }
  async sendMessage() {
    await this.sendMessageButton.click();
  }
  async getLastSentMessage() {
    await this.page.waitForSelector(".sc-jmxxdg.bVCWwt");
    const messageElements = await this.page.$$(".sc-jmxxdg.bVCWwt");
    return messageElements.pop();
  }
}

module.exports = MessagePage;
