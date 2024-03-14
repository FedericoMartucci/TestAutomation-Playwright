class ProfilePage {
    constructor(page) {
      this.page = page;
      this.unfollowTinchoButton = page.getByText("Unfollow");
      this.followTinchoButton = page.getByText("Follow");
    }
  
    async followTincho() {
      await this.followTinchoButton.click();
    }
    async unfollowTincho() {
      await this.unfollowTinchoButton.click();
    }
  }
  
  module.exports = ProfilePage;
  