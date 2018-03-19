const Catalog = () => {
  describe('Test suite for Catalog page', () => {
    describe('Click on a card in the catalog', () => {
      it('Should display recipe detail page after clicking on a card', (client) => {
        client
          .url('http://localhost:8080/catalog')
          // .resizeWindow(1440, 826)
          .waitForElementVisible('body', 2000)
          .pause(3000)
          .click('.card')
          .pause(5000);
      });
    });
  });
};

export default Catalog;
