const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://frontend-training-taupe.vercel.app/login");
});

test("Follow a user by his profile", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(2000);
  await homePage.goTinchoProfile();
  await page.waitForTimeout(4000);

  await profilePage.followTincho();
  await page.waitForTimeout(2000);
  expect(profilePage.unfollowTinchoButton).toBeVisible();

  await profilePage.unfollowTincho();
  await page.waitForTimeout(2000);
  expect(profilePage.followTinchoButton).toBeVisible();
});
