class LoginPage {

    url = "https://frontend-training-taupe.vercel.app/login";

    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username')
        this.passwordInput = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorLabel = page.getByText('Sorry, your username or password was incorrect. Please try again.')
        this.loader = page.locator('.edgZfu')
    }

    async goto() {
        await this.page.goto(this.url)
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // wait for home to fully-load
        await this.page.waitForURL('**/');
    }
}

module.exports = LoginPage;