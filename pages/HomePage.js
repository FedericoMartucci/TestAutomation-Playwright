class HomePage {
    constructor(page) {
        this.page = page;
        this.homeText = page.getByRole('heading', { name: 'Home' })
        this.tweetButton = page.getByRole('button', { name: 'Tweet' })
        this.tweetModalButton = page.getByRole('button', { name: 'Tweet', exact: true }).nth(1)
        this.tweetTextArea = page.getByPlaceholder("What's happening?")
        this.tweetText = page.getByText('Example tweet').first()
        this.uploadImage = page.locator('.sc-fnOeiS > label')
    }

    async tweetMessage(message){
        this.tweetButton.click()
        await this.page.waitForSelector('.sc-ftLKQv');
        this.tweetTextArea = await this.page.getByPlaceholder("What's happening?");
        this.tweetTextArea.fill(message)
        this.tweetModalButton.click()
    }
    async tweetImage(image){
        this.tweetButton.click()
        await this.page.waitForSelector('.sc-ftLKQv');
        this.uploadImage.click()
    }
}

module.exports = HomePage;