const AddRecipeTest = () => {
  describe('Test suite for Add Recipe page', () => {
    describe('Add a new recipe', () => {
      it('Should check if page is AddRecipe page', (client) => {
        client
          .url('http://localhost:8080/new')
          .waitForElementVisible('body', 2000)
          .assert.containsText('h3.text-white', 'Hey sample007');
      });
      it('Should fill the form with correct data', (client) => {
        client
          .setValue('input[name=recipe]', 'How to cook yam')
          .pause(1000)
          .setValue('textarea[name=description]', 'very popular meal in asia')
          .pause(1000)
          .setValue('textarea[name=ingredients]', 'water, salt')
          .pause(1000)
          .setValue('textarea[name=direction]', 'pour water and stir')
          .pause(1000)
          .click('input[type=submit]')
          .pause(3000);
        // .end();
      });
    });
  });
};

export default AddRecipeTest;
