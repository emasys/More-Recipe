const FavoritePage = () => {
  describe('Test suite for Favorite recipe page', () => {
    describe('Check if page is really favorite recipe page', () => {
      it('Should display all the required infomation including a recipe card', (client) => {
        client
          .url('http://localhost:8080/favorites')
          // .maximizeWindow()
          .waitForElementVisible('body', 2000)
          .assert.containsText('h2.float-left', 'Favorite Recipes')
          .assert.containsText(
            'h4.card-title.custom-bg.bg-dark.p-2.m-0.text-truncate ',
            'How to cook yam in 10mins'
          )
          // .assert.visible('.card')
          .pause(3000);
      });
    });
  });
};

export default FavoritePage;
