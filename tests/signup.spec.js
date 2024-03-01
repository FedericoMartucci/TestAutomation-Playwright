
const { test, expect } = require('@playwright/test');
const SignupPage = require("../pages/SignupPage");

test('User can register successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto()
  await signupPage.register({
    name: 'lucas',
    email: 'lucas.david.car99@gmail.com',
    username: 'lucas9931',
    password: 'a1@A3456',
    confirmPassword: 'a1@A3456'
  })
});

