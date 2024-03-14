const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const MessagePage = require("../pages/MessagePage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://frontend-training-taupe.vercel.app/login");
});

test("User can send a message", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const messagePage = new MessagePage(page);
  const message = new Date().toString()

  await loginPage.login("federicoMartucci03", "Password123.");
  await page.waitForTimeout(3000);
  await homePage.clickMessages();
  await page.waitForTimeout(2000);
  await messagePage.clickUser();
  await messagePage.writeMessage(message);
  await messagePage.sendMessage();
  await page.waitForTimeout(1000);

  const sentMessage = await messagePage.getLastSentMessage()
  expect(await sentMessage.isVisible()).toBe(true);
  expect(await sentMessage.textContent()).toBe(message);
});
