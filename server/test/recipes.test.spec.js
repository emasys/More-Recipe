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

describe('CRUD/ for recipes', () => {
  describe('SIGN_UP/ ', () => {
    it('should register a first user and return a status code 201', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput(
          'emasys',
          'endy',
          'second account',
          'emasysnd@gmail.com',
          'password',
          'password',
          'Nigeria',
          'admin',
          'avatarurl',
        ))
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('SIGN_UP/ ', () => {
    it('should register a second user and return a status code 201', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput(
          'emasys',
          'endy',
          'second account',
          'emasys@gmail.com',
          'password',
          'password',
          'Nigeria',
          'admin2',
          'avatarurl',
        ))
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('SIGN_IN/ sign in a new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            xtoken = res.body.token; // make token accessible to protected routes
          }
          done();
        });
    });
  });

  describe('SIGN_IN/ sign in a new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasys@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            secondToken = res.body.token; // make token accessible to protected routes
          }
          done();
        });
    });
  });

  describe('GET/ test if the invalid routes are working', () => {
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

  describe('POST/ add a new recipe', () => {
    it('should return a status code of 201 if user is authorized and query is successful', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          name: 'fsdfsf',
          direction: 'hdfhdskjhfkjdsf',
          description: 'justekjdkjkj',
          category: 'dsfsf',
          foodImg: 'dkjfkjbkfsdf',
          ingredients: 'hdhasds, dsdsdsd'
        })
        .set('x-access-token', xtoken)
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('GET/ fetch all recipes', () => {
    it('should return all recipes in the database', (done) => {
      request(app)
        .get('/api/v1/recipes/2')
        .expect(200)
        .end(done);
    });
  });

  describe('GET/ fetch a single recipe', () => {
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

  describe('GET/ fetch a single recipe', () => {
    it('should return a single recipe with an increment in the view count', (done) => {
      request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', secondToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('GET/ fetch a single recipe', () => {
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

  describe('POST/ search for a recipe', () => {
    it('should return status code 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipeSearch')
        .send({ query: 'water' })
        .expect(200)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('POST/ add a new recipe', () => {
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

  describe('POST/ update an existing recipe', () => {
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

  describe('PUT/ update an existing recipe', () => {
    it('should return a status code of 404 if a recipe does not exist', (done) => {
      request(app)
        .put('/api/v1/recipes/5')
        .send(seed.setUpdateRecipe('How to fry something else', 'water, oil', 'just do it', 'local food'))
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ error: 'recipe not found' });
        })
        .end(done);
    });
  });

  describe('Post a review', () => {
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

  describe('Post a review', () => {
    it('should return a status code of 404 if a recipe to be reviewed is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(404)
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

  describe('GET/ check if a user has favorited this recipe', () => {
    it('should return a status of "favorite" if a user has added the recipe to his favorite list', (done) => {
      request(app)
        .get('/api/v1/recipes/1/favStatus')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'favorite' });
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
          expect(res.body).to.include({ status: 'unfavorited' });
        })
        .end(done);
    });
  });

  describe('GET/ check if a user has favorited this recipe', () => {
    it('should return a status of "not favorite" if the recipe is not in user\'s favorite list', (done) => {
      request(app)
        .get('/api/v1/recipes/1/favStatus')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: false, status: 'not favorite' });
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


  describe('Get All User\'s favortes', () => {
    it('should return a status code of 200 if all user recipes are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/recipes/user/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });


  describe('GET/ check if a user has favorited this recipe', () => {
    it('should return a status code of 404 if the recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipes/a/favStatus')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false, status: 'recipe not found' });
        })
        .end(done);
    });
  });

  describe('Check if a user has neither upvoted or downvoted', () => {
    it('should return a status code of 200 if user has not done any', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            upvote: { success: false }, downvote: { success: false }
          });
        })
        .end(done);
    });
  });

  describe('Check if a user has either upvote or downvoted', () => {
    it('should return a status code of 404 if the recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'upvoted' });
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
          expect(res.body).to.include({ success: true, status: 'upvote cancelled' });
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
          expect(res.body).to.include({ success: true, status: 'downvoted' });
        })
        .end(done);
    });
  });

  // describe('Check if a user has downvoted', () => {
  //   it('should return a status code of 200 if successful', (done) => {
  //     request(app)
  //       .get('/api/v1/recipes/upvoteReaction/1')
  //       .set('x-access-token', xtoken)
  //       .expect(200)
  //       .end(done);
  //   });
  // });

  describe('Upvote a recipe again', () => {
    it('should cancel the previous downvote and set upvote instead', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'upvoted' });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe', () => {
    it('should cancel the previous upvote and set downvote instead', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'downvoted' });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe again', () => {
    it('should cancel the previous downvote', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'downvote cancelled' });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });


  describe('GET the list of all user\'s recipes', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/yours/1/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('DELETE/ a recipe', () => {
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

  describe('DELETE/ a recipe', () => {
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
