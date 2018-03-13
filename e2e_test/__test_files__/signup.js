require('babel-register');
const models = require('../../server/models');

const SignUpTest = () => {
  describe('Test suite for Signup page', () => {
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

    describe('Fill up form and register a user', () => {
      it('Should check if page is signup page', (client) => {
        client
          .url('http://localhost:8080/signup')
          .waitForElementVisible('body', 2000)
          .assert.containsText('h1.text-white', 'Just one last step')
          .assert.containsText(
            'form ul li:last-child',
            'Already have an account?'
          );
      });
      it('Should fill the signup form with incorrect data', (client) => {
        client
          .setValue('input[name=email]', 'sample007@example.com')
          .pause(1000)
          .setValue('input[name=moniker]', 'sample007')
          .pause(1000)
          .setValue('input[name=password]', 'password')
          .pause(1000)
          .setValue('input[name=confirmPassword]', 'password')
          .pause(1000)
          .click('input[type=submit]')
          .assert.containsText(
            'form .characters',
            'Should contain at least one special character'
          )
          .assert.containsText(
            'form #check_numbers',
            'Should contain at least one number'
          );
      });

      it('Should clear the signup form', (client) => {
        client
          .clearValue('input[name=email]')
          .clearValue('input[name=moniker]')
          .clearValue('input[name=password]')
          .clearValue('input[name=confirmPassword]');
      });
      it('Should fill the signup form with correct data ', (client) => {
        client
          .setValue('input[name=email]', 'sample007@example.com')
          .pause(1000)
          .setValue('input[name=moniker]', 'sample007')
          .pause(1000)
          .setValue('input[name=password]', 'p@ssw0rd')
          .pause(1000)
          .setValue('input[name=confirmPassword]', 'p@ssw0rd')
          .pause(1000)
          .click('input[type=submit]')
          .pause(5000);
      });
    });

    describe('Redirect to home page', () => {
      it('Should check if it is in home page', (client) => {
        client
          .setWindowPosition(0, 0)
          .pause(2000)
          .assert.containsText(
            '.bg-mirror',
            'This is a platform for you to share the awesome and exciting recipe ideas you have invented or learnt.'
          )
          .assert.containsText(
            '.bg-mirror',
            'Recipes are by nature derivative and meant to be shared that is how they improve, are changed, how new ideas are formed.'
          )
          .assert.containsText('h4.header-title', 'Top Recipes')
          .assert.containsText('h5.float-right', 'see all recipes')
          .assert.visible('.signUp-btn');
      });
    });
  });
};

export default SignUpTest;
