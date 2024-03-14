const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://frontend-training-taupe.vercel.app/login");
});


test("User can tweet a message successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login("federicoMartucci03", "Password123.");
  await homePage.tweetMessage("Example tweet");
  await homePage.tweet();
  await expect(homePage.tweetText).toBeVisible();
});

test("User can follow other users from home page", async ({ page }) => {
  await page.waitForTimeout(10000);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profilePage = new ProfilePage(page);
  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(3000);
  await homePage.followTincho();
  await page.waitForTimeout(4000);
  await expect(homePage.tinchoUser).not.toBeVisible();
  await page.waitForTimeout(2000);
  await page.goto(
    "https://frontend-training-taupe.vercel.app/profile?user=6bef2a19-35b3-496c-b2ed-065ba1c6162b"
    );
    await page.waitForTimeout(2000);
    await profilePage.unfollowTincho();
    await page.waitForTimeout(1000);
  });
// test("User can tweet a picture successfully", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   loginPage.login("federicoMartucci03", "Password123.");
//   await page.waitForTimeout(1000);
//   await homePage.tweetMessage("Example tweet")
//   await page.waitForTimeout(1000);
//   await homePage.tweetImage();
//   await page.waitForTimeout(1000);
//   await homePage.tweet();
//   await expect(homePage.tweetText).toBeVisible();
// });
// afterAll(async ({ page }) => {

// });
