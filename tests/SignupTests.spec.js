
const { test, expect, describe } = require('@playwright/test');
const SignupPage = require("../pages/SignupPage");

describe('signup page tests', () => {
  test('User can sign up successfully', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto()
    await signupPage.registerSuccessfully({
      name: 'lucas',
      email: 'lucas.david.car99@gmail.com',
      username: 'lucas9931',
      password: 'a1@A3456',
      confirmPassword: 'a1@A3456'
    })
  });

  test('User can not sign up with wrong data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto()
    await signupPage.registerWithErrors({
      name: 'asdas',
      email: 'asdsa@gmail.com',
      username: 'adasdsa',
      password: 'a1@s',
      confirmPassword: 'a1@asdsad'
    })
  })
})

