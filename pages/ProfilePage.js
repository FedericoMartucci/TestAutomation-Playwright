class ProfilePage {
    constructor(page) {
      this.page = page;
      this.unfollowTinchoButton = page.getByText("Unfollow");
    }
  
    async unfollowTincho() {
      await this.unfollowTinchoButton.click();
    }
  }
  
  module.exports = ProfilePage;
  