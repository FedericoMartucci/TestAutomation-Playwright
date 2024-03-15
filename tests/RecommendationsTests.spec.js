const { test, expect, describe } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");
const RecommendationsPage = require("../pages/RecommendationsPage");

// test.beforeEach(async ({ page }) => {
//     await page.goto("https://frontend-training-taupe.vercel.app/login");
//   });
describe('recommendations page tests', () => {
  let loginPage
  // these can be extracted to env variables
  const loginUsername = "federicoMartucci03"
  const loginPassword = "Password123."

  const userToFollowUsername = "Tincho"
  const userToFollowId = "6bef2a19-35b3-496c-b2ed-065ba1c6162b"

  test.beforeEach(async ({ page }) => {
    // pre-condition, can be simplified with fixtures
    loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(loginUsername, loginPassword)
  });

  test("User can follow other users from HomePage/Show more", async ({page}) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page, userToFollowId);
    const recommendationsPage = new RecommendationsPage(page);
    await homePage.goToRecommendations();
    //await page.waitForTimeout(1000);
    await recommendationsPage.followTincho();
    await profilePage.goto()
    await profilePage.unfollowUser();
  });
})
