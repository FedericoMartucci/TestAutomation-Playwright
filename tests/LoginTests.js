
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('User can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://frontend-training-taupe.vercel.app/login');
    await loginPage.login('username', 'password');
});

