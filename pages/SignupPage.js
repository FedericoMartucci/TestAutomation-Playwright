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
    this.passwordError = page.getByText('Password must be at least 8 characters')
    this.confirmPasswordError = page.getByText('Passwords must match', {exact: true})
  }

  async goto() {
    await this.page.goto('https://frontend-training-taupe.vercel.app/register');
  }

  async registerSuccessfully({ name, username, email, password, confirmPassword }){
    await this.fillInputs({name, username, email, password, confirmPassword});
    await this.registerButton.click()
    await this.page.waitForURL('**/');
  }

  async fillInputs({ name, username, email, password, confirmPassword }) {
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
  }

  async registerWithErrors({ name, username, email, password, confirmPassword }) {
    await this.fillInputs({name, username, email, password, confirmPassword})
    await this.registerButton.click()
    await expect(await this.passwordError).toBeVisible()
    await expect(await this.confirmPasswordError).toBeVisible()
    await expect(await this.passwordError).toContainText("Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol")
    await expect(await this.confirmPasswordError).toContainText("Passwords must match")
    await expect(await this.confirmPasswordError).toHaveCSS('color', 'rgb(224, 60, 57)')
    await expect(await this.passwordError).toHaveCSS('color', 'rgb(224, 60, 57)')
  }
}