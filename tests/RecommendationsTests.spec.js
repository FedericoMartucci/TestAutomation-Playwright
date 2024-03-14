const { test, expect, afterAll } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");
const RecommendationsPage = require("../pages/RecommendationsPage");

test.beforeEach(async ({ page }) => {
    await page.goto("https://frontend-training-taupe.vercel.app/login");
  });

test("User can follow other users from HomePage/Show more", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);
    const recommendationsPage = new RecommendationsPage(page);
    await loginPage.login("federicoMartucci03", "Password123.");
    await page.waitForTimeout(3000);
    await homePage.clickShowMore();
    await page.waitForTimeout(1000);
    await recommendationsPage.followTincho();
    await page.waitForTimeout(1000);
    await expect(recommendationsPage.tinchoProfile).not.toBeVisible();
    await page.goto(
      "https://frontend-training-taupe.vercel.app/profile?user=6bef2a19-35b3-496c-b2ed-065ba1c6162b"
    );
    await page.waitForTimeout(2000);
    await profilePage.unfollowTincho();
    await page.waitForTimeout(1000);
  });