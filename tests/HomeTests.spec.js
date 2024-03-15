const { test, expect, describe } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const ProfilePage = require("../pages/ProfilePage");
const {randomUUID} = require("node:crypto");

describe('home page tests', () => {

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

  test("User can tweet a message successfully", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.tweetMessage(randomUUID());
    // await homePage.tweet();
  });

  test("User can follow other users from home page", async ({ page }) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page, userToFollowId);

    await homePage.followUser({username: userToFollowUsername})
    await profilePage.goto()
    await profilePage.unfollowUser();
  });

  test("User can be able to log out", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.logout()

    expect(page.url()).toBe(loginPage.url);
  });

  test("User can be able to change language", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.clickThreeDots();
    await homePage.switchToSpanish();

    await expect(await homePage.homeText).not.toBeVisible()

    await homePage.switchToEnglish();
  });
  test("User can retweet", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.retweet();

    expect(await homePage.retweetCounter.innerText()).toBe('1');

    await homePage.cancelRetweet();

    expect(await homePage.retweetCounter.innerText()).toBe('0');
  });

  test("User can like a tweet", async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.tweetMessage(randomUUID());


    await homePage.likeTweet()

  })

  test("User can comment a tweet", async ({page}) => {
    const homePage = new HomePage(page);
    const description = randomUUID()
    const commentText = randomUUID()

    await homePage.tweetMessage(description);
    await homePage.commentOnTweet(commentText)
  })
})



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
