class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username')
        this.passwordInput = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorLabel = page.getByLabel('Sorry, your username or password was incorrect. Please try again.')
        this.loader = page.locator('.edgZfu')
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;