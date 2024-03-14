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
  await page.waitForTimeout(2000);

  await homePage.tweetMessage("Example tweet");
  await homePage.tweet();
  await page.waitForTimeout(2000);

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

test("User can be able to log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(3000);

  await homePage.clickThreeDots();
  await homePage.clickFirstLogoutButton();
  await homePage.clickLastLogoutButton();
  await page.waitForTimeout(3000);

  expect(page.url()).toBe("https://frontend-training-taupe.vercel.app/login");
});

test("User can be able to change language", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(3000);
  
  await homePage.clickThreeDots();
  await page.waitForTimeout(1000);
  await homePage.switchToSpanish();
  await page.waitForTimeout(1000);
  
  expect(await homePage.homeText.isVisible()).toBe(false);

  await homePage.switchToEnglish();
});
test("User can retweet", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(3000);
  
  await homePage.retweet();
  await page.waitForTimeout(3000);

  expect(await homePage.retweetCounter.innerText()).toBe('1');
  
  await homePage.cancelRetweet();
  await page.waitForTimeout(3000);
  
  expect(await homePage.retweetCounter.innerText()).toBe('0');
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
