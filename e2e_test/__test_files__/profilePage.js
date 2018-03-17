const ProfilePage = () => {
  describe('Test suite for Profile page', () => {
    describe('Check if page is really profile page', () => {
      it('Should display all the required information including a recipe card', (client) => {
        client
          .url('http://localhost:8080/profile/1')
          .waitForElementVisible('body', 2000)
          .assert.containsText('.profile-wrapper h2', 'sample007')
          .assert.containsText(
            'h4.card-title.custom-bg.bg-dark.p-2.m-0 ',
            'How to cook yam in 10mins'
          )
          .assert.containsText('small', 'sample007@example.com')
          .pause(3000);
      });
      it('Should upload a profile picture', (client) => {
        client
          .moveToElement('.changeDp', 100, 100, () => {
            client.waitForElementVisible('.dropzone-dp', 1000, () => {
              client.click('.dropzone-dp', () => {
                /* eslint-disable */
                client.setValue(
                  'input[type="file"]',
                  require('path').resolve(
                    '/Users/andeladeveloper/Desktop/adele.png'
                  )
                );
              });
            });
          })
          .pause(3000)
          .click('#upload-dp')
          .pause(5000)
          .click('#edit-profile');
      });

      it('Should edit user info with incorrect data', client => {
        client
          .setValue('input[name=firstName]', 'emmy007')
          .pause(1000)
          .setValue('input[name=lastName]', 'endy007')
          .pause(1000)
          .setValue(
            'textarea[name=bio]',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          )
          .pause(1000)
          .click('#country option[value="Brazil"]')
          .pause(1000)
          .click('input[type=submit]')
          .pause(2000)
          .assert.containsText('#firstname_error', 'Please enter a valid name')
          .assert.containsText('#lastname_error', 'Please enter a valid name')
          .pause(3000);
      });

      it('Should clear errored textfields and fill it with correct data', client => {
        client
          .clearValue('input[name=firstName]', () => {
            client.setValue('input[name=firstName]', 'emasys');
          })
          .pause(1000)
          .clearValue('input[name=lastName]', () => {
            client.setValue('input[name=lastName]', 'endy');
          })
          .pause(1000)
          .click('input[type=submit]')
          .pause(6000);
      });

      it('Should delete a recipe', client => {
        client
          .click('.delete-btn')
          .pause(2000)
          .click('.modal-footer .btn-danger')
          .pause(3000)
          .assert.elementNotPresent('h4.card-title.custom-bg.bg-dark.p-2.m-0');
      });
    });
  });
};

export default ProfilePage;
