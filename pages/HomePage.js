class HomePage {
    constructor(page) {
        this.page = page;
        this.tweetButton = page.getByRole('button', { name: 'Tweet' });
        this.homeText = page.getByRole('heading', { name: 'Home' })
    }
}

module.exports = HomePage;