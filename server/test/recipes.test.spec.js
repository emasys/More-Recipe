import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import seed from '../seeders/seeds';
import models from '../models';


let xtoken = null;
let secondToken = null;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Test suite for recipe controller:', () => {
  describe('create a new user ', () => {
    it('should register a first user and return a status code 201', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'emasysnd@gmail.com',
          password: 'password',
          confirmPassword: 'password',
          moniker: 'admin'
        })
        .expect(201)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.include({ success: true });
            xtoken = res.body.token;
          }
        })
        .end(done);
    });
  });

  describe('create another new user ', () => {
    it('should register a second user and return a status code 201', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'emasys@gmail.com',
          password: 'password',
          confirmPassword: 'password',
          moniker: 'admin2'
        })
        .expect(201)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.include({ success: true });
            secondToken = res.body.token;
          }
        })
        .end(done);
    });
  });

  describe('sign in the first new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            xtoken = res.body.token;
          }
          done();
        });
    });
  });

  describe('sign in the second new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasys@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            secondToken = res.body.token;
          }
          done();
        });
    });
  });

  describe('check if invalid routes are working', () => {
    it('should return status code 404 and a message "page not found"', (done) => {
      request(app)
        .get('/api/v1/recipesds/misplaced')
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({
            error: 'page not found',
          });
        })
        .end(done);
    });
  });

  describe('add a new recipe', () => {
    it('should return a status code of 201 if user is authenticated and query is successful', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          name: 'fried yam',
          direction: 'how to cook it',
          description: 'regular food',
          category: 'yam',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('x-access-token', xtoken)
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('fetch all recipes:', () => {
    it('should return all recipes in the database', (done) => {
      request(app)
        .get('/api/v1/recipes/1/1')
        .expect(200)
        .end(done);
    });
  });

  describe('fetch a single recipe', () => {
    it('should return a single recipe without an increment in the view count', (done) => {
      request(app)
        .get('/api/v1/recipe/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  // describe.skip('fetch a single recipe', () => {
  //   it('should return a single recipe with an increment in the view count', (done) => {
  //     request(app)
  //       .get('/api/v1/recipes/1')
  //       .set('x-access-token', secondToken)
  //       .expect(200)
  //       .expect((err, res) => {
  //         console.log('=======>secondToken', secondToken);
  //         if (!err) expect(res.body).to.include({ success: true });
  //       })
  //       .end(done);
  //   });
  // });

  describe('fetch a single recipe that does not exist', () => {
    it('should return a status 404 if recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipe/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('search for a recipe', () => {
    it('should return status code 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/search/2/0')
        .send({ query: 'water' })
        .expect(200)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Add a new recipe', () => {
    it('should return a status code of 401 if user is not authorized', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send(seed.setRecipeInput(
          'How to fry something',
          'water, oil',
          'just do it',
          'local food',
          'some url',
          'vegetarian',
        ))
        .set('x-access-token', 'somerandomtoken')
        .expect(401)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Update an existing recipe', () => {
    it('should return a status code of 200 if a recipe is updated', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .send(seed.setUpdateRecipe('How to fry something', 'water, oil', 'just do it', 'local food'))
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Update a non-existing recipe', () => {
    it('should return a status code of 404 if a recipe does not exist', (done) => {
      request(app)
        .put('/api/v1/recipes/5')
        .send(seed.setUpdateRecipe('How to fry something else', 'water, oil', 'just do it', 'local food'))
        .set('x-access-token', xtoken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ error: 'something went wrong' });
        })
        .end(done);
    });
  });

  describe('Post a review for an existing recipe', () => {
    it('should return a status code of 201 if a review is successfully added', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Post a review for a non-existing recipe', () => {
    it('should return a status code of 500 if a recipe to be reviewed does\'s exist', (done) => {
      request(app)
        .post('/api/v1/recipes/5/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(500)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 422 if review is empty', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: '' })
        .set('x-access-token', xtoken)
        .expect(422)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 422 if a review is not successfully added due to wrong keyword', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ contents: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(422)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Favorite a recipe', () => {
    it('should return a status code of 200 if a recipe is successfully favorited', (done) => {
      request(app)
        .post('/api/v1/recipes/1/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'favorited' });
        })
        .end(done);
    });
  });

  describe('Favorite a recipe again', () => {
    it('should return a status code of 200 if a recipe is successfully unfavorited', (done) => {
      request(app)
        .post('/api/v1/recipes/1/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'cancel' });
        })
        .end(done);
    });
  });

  describe('Favorite a recipe', () => {
    it('should return a status code of 404 if a recipe to be favorited is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/fav')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });


  describe('Get all user\'s favorite recipes,', () => {
    it('should return a status code of 200 if all user recipes are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/favorites')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('View another user\'s favorite recipes,', () => {
    it('should return a status code of 401 if the requester is not authenticated', (done) => {
      request(app)
        .get('/api/v1/favorites')
        .set('x-access-token', 'dfgskjnkjng')
        .expect(401)
        .end(done);
    });
  });

  describe('Upvote a recipe,', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe again', () => {
    it('should return a status code of 200 if previous upvote is successfully cancelled', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'cancelled' });
        })
        .end(done);
    });
  });


  describe('Downvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe after initially downvoting it,', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'voted' });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe that does not exist,', () => {
    it('should return a status code of 500 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/10')
        .set('x-access-token', xtoken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe that does not exist,', () => {
    it('should return a status code of 500 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/10')
        .set('x-access-token', xtoken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });
  describe('GET the list of all user\'s recipes', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1//recipes/user/1/1/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Delete a recipe by another user,', () => {
    it('should return a status code of 401 if recipe was not created by the user', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('x-access-token', secondToken)
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false, status: 'cannot delete this recipe' });
        })
        .end(done);
    });
  });

  describe('Delete a recipe,', () => {
    it('should return a status code of 200 if recipe is successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Delete a recipe,', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .delete('/api/v1/recipes/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });
});
