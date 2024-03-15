const {test, expect, describe} = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");

describe('login page tests', () => {

  const loginUsername = "federicoMartucci03"
  const loginPasswordValid = "Password123."
  const loginPasswordInvalid = "Password12."

  test("User can login successfully", async ({page}) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    await loginPage.goto()
    await loginPage.login(loginUsername, loginPasswordValid);
    // await expect(homePage.homeText).toBeVisible();
  });
  test("The user cannot log in using an incorrect password.", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login(loginUsername, loginPasswordInvalid);
    await expect(await loginPage.loader).toBeVisible();
    // await page.waitForTimeout(1000);
    await expect(await loginPage.loginErrorLabel).toBeVisible();

  });
})
