// @ts-check
const { expect } = require('@playwright/test');

module.exports = class SignupPage {

  constructor(page) {
    this.page = page
    this.nameInput = page.getByLabel('Name', { exact: true })
    this.usernameInput = page.getByLabel('Username', { exact: true })
    this.emailInput = page.getByLabel('Email', { exact: true })
    this.passwordInput = page.getByLabel('Password', { exact: true })
    this.confirmPasswordInput = page.getByLabel('Confirm Password', { exact: true })
    this.registerButton = page.getByText('Register', { exact: true })
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/register');
  }

  async register({ name, username, email, password, confirmPassword }){
    await this.nameInput.fill(name)
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(confirmPassword)
    expect(name, await this.nameInput.inputValue())
    expect(username, await this.usernameInput.inputValue())
    expect(email, await this.emailInput.inputValue())
    expect(password, await this.passwordInput.inputValue())
    expect(confirmPassword, await this.confirmPasswordInput.inputValue())
    await this.registerButton.click()
    await this.page.waitForURL('**/');
  }
}