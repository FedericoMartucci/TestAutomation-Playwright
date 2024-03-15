const {expect} = require("@playwright/test");

class ProfilePage {
  baseUrl = "https://frontend-training-taupe.vercel.app/profile"

  /**
   * To create the profile page of the logged-in user, "userId" should not be provided
   * */
  constructor(page, userId) {
    this.page = page;
    this.userId = userId;
    this.unfollowButton = page.getByText("Unfollow");
    this.followButton = page.getByText("Follow");
    this.editButton = page.getByText("Edit profile");
    this.saveChangesButton = page.getByText("Save changes");
    this.editDescriptionTextbox = page.getByRole('textbox');
    this.deleteButton = page.getByRole('button', { name: 'Delete' })
  }

  async goto() {
    await this.page.goto(this.url)
  }

  async followUser() {
    await this.followButton.click();
    await expect(await this.unfollowButton).toBeVisible()
  }

  async unfollowUser() {
    await this.unfollowButton.click();
    await expect(await this.followButton).toBeVisible()
  }

  async edit(description) {
    await this.editButton.click()
    await this.editDescriptionTextbox.fill(description)
    await this.saveChangesButton.click()
    await expect(await this.editDescriptionTextbox).toContainText(description)
  }

  async delete() {
    await expect(await this.deleteButton).toBeVisible()
    await expect(await this.deleteButton).not.toBeDisabled()
  }

  get url() {
    return this.userId ? `${this.baseUrl}?user=${this.userId}` : this.baseUrl
  }
}

module.exports = ProfilePage;
  