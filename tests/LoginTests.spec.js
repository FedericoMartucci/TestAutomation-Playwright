
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

test.describe('login', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://frontend-training-taupe.vercel.app/login');
    });
  
    test('User can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await loginPage.login('federicoMartucci03', 'Password123.');
        await expect(homePage.homeText).toBeVisible();
    });
    test('The user cannot log in using an incorrect password.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('federicoMartucci03', 'Password12.');

        await expect(loginPage.loginErrorLabel).toBeVisible();
    });
  });
