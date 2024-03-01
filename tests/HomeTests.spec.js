const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://frontend-training-taupe.vercel.app/login");
});

test("User can tweet a message successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login("federicoMartucci03", "Password123.");
  await homePage.tweetMessage("Example tweet")
  await expect(homePage.tweetText).toBeVisible();
});
test("User can tweet a picture successfully", async ({
  page,
}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.login("federicoMartucci03", "Password123.");
    await homePage.tweetImage("Example tweet")
    await expect(homePage.tweetText).toBeVisible();
});
