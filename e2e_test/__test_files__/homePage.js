require('babel-register');
const models = require('../../server/models');

const HomePageTest = () => {
  describe('Test suite for homepage', () => {
    describe('Test page as an unauthenticated user', () => {
      before((client, done) => {
        models.sequelize
          .sync({ force: true })
          .then(() => {
            done(null);
          })
          .catch((errors) => {
            done(errors);
          });
      });


      it('Checks for element visibility and texts on page', (client) => {
        client
          .url('http://localhost:8080')
          .waitForElementVisible('body', 2000)
          .pause(3000)
          .assert.title('More Recipe')
          .assert.containsText('.nb', 'More Recipes')
          .waitForElementVisible('.navbar', 2000)
          .assert.visible('.navbar')
          .assert.containsText('.nav-item a.text-orange', 'Hi there,')
          .assert.containsText('.home-title', 'More Recipes')
          .assert.containsText(
            '.bg-mirror',
            'This is a platform for you to share the awesome and exciting recipe ideas you have invented or learnt.'
          )
          .assert.containsText(
            '.bg-mirror',
            'Recipes are by nature derivative and meant to be shared that is how they improve, are changed, how new ideas are formed.'
          )
          .assert.containsText('h4.header-title', 'Top Recipes')
          .assert.containsText('h5.float-right', 'see all recipes');
      });

      it('Test for clicks on action buttons', (client) => {
        client
          .click('h5.float-right a.hvr-icon-wobble-horizontal')
          .pause(2000)
          .assert.containsText('.category-bar', 'categories')
          .click('.signUp-btn')
          .pause(2000)
          .assert.containsText(
            '.alert-warning',
            'You have to be logged in to view this content'
          )
          .click('.nb')
          .pause(2000)
          .assert.visible('.signUp-btn')
          .click('.signUp-btn')
          .assert.containsText('h1.text-white', 'Just one last step')
          .pause(2000);
      });
    });
  });
};

export default HomePageTest;
