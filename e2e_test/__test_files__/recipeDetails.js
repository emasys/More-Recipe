const RecipeDetails = () => {
  describe('Test suite for Recipe details page', () => {
    describe('Click on reaction buttons and leave a review', () => {
      it('Should find and click on reaction buttons', (client) => {
        client
          .url('http://localhost:8080/recipe/1')
          // .maximizeWindow()
          .waitForElementVisible('body', 2000)
          .assert.containsText('h2.text-capitalize', 'How To Cook Yam')
          .click('.reaction-pane span:first-child')
          .pause(2000)
          .click('.reaction-pane span:nth-child(2)')
          .pause(2000)
          .click('.reaction-pane span:nth-child(3)')
          .pause(2000)
          .moveToElement('#floating-delete', 10, 10)
          .pause(2000)
          .moveToElement('#floating-edit', 10, 10)
          .pause(2000)
          .click('#floating-edit')
          .pause(3000);
      });

      it('Should clear the edit form', (client) => {
        client
          .clearValue('input[name=recipe]')
          .clearValue('textarea[name=description]')
          .clearValue('textarea[name=ingredients]')
          .clearValue('textarea[name=direction]')
          .pause(2000);
      });
      it('Should edit a recipe', (client) => {
        client
          .setValue('input[name=recipe]', 'How to cook yam in 10mins')
          .pause(1000)
          .setValue(
            'textarea[name=description]',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          )
          .pause(1000)
          .setValue('textarea[name=ingredients]', 'water, salt, oil, sugar')
          .pause(1000)
          .setValue(
            'textarea[name=direction]',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          )
          .pause(1000)
          .click('#selectBox option[value="Lunch"]')
          .pause(1000)
          .click('input[type=submit]')
          .pause(5000);
      });

      it('Should leave a review', (client) => {
        client
          .setValue(
            'textarea[name=reviewBox]',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          )
          .pause(1000)
          .click('button[type=submit]')
          .pause(3000);
      });

      it('Should delete a review', (client) => {
        client
          .moveToElement('.delete-review-btn', 10, 10)
          .pause(2000)
          .click('.delete-review-btn')
          .pause(3000)
          .assert.elementNotPresent('.comments p');
      });

      it('Should upload an image', (client) => {
        client
          .execute('scrollTo(0, 0)')
          .pause(2000)
          .moveToElement('.changeDp', 10, 10, () => {
            client.waitForElementVisible('.dropzone-dp', 3000, () => {
              client.click('.dropzone-dp', () => {
                /* eslint-disable */
                client.setValue(
                  'input[type="file"]',
                  require('path').resolve(
                    '/Users/andeladeveloper/Desktop/mR (1).png'
                  )
                );
              });
            });
          })
          .pause(3000)
          .click('#upload-image-btn')
          .pause(6000)
          .click('#favorite')
          .pause(2000);
      });
    });
  });
};

export default RecipeDetails;
