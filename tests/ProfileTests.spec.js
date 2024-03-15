const { test, expect, describe } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");

// test.beforeEach(async ({ page }) => {
//   await page.goto("https://frontend-training-taupe.vercel.app/login");
// });

describe('profile page tests', () => {

  let loginPage
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


  test("Follow a user by his profile", async ({ page }) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page, userToFollowId);

    // await homePage.goTinchoProfile();
    await homePage.goToUserProfile({ username: userToFollowUsername })
    await page.waitForURL(profilePage.url)

    await profilePage.followUser();
    //await page.waitForTimeout(2000);
    //expect(profilePage.unfollowButton).toBeVisible();

    await profilePage.unfollowUser();
    //await page.waitForTimeout(2000);
    //expect(profilePage.followButton).toBeVisible();
  });
})
