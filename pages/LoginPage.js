class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async login(username, password) {
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }
}

module.exports = LoginPage;