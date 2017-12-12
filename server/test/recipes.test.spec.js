import request from 'supertest';
import app from '../index';
import seed from '../seeders/seeds';
import models, { Users } from '../models';

let xtoken = null;

describe('CRUD/ for recipes', () => {
  before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      Users.create({
        firstName: 'emasys',
        lastName: 'Emmanuel',
        bio: 'I am a human from planet earth',
        email: 'emasysnd@gmail.com',
        password: 'password',
        moniker: 'admin',
        country: 'Nigeria',
        avatar: 'someurl'
      })
        .then(() => {
          request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'emasysnd@gmail.com', password: 'password' })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              xtoken = res.body.token; // make token accessible to protected routes
              request(app)
                .post('/api/v1/recipes')
                .send({
                  userId: 2,
                  name: 'how to cook some stuff',
                  ingredient: 'water, salt, pepper',
                  direction: 'just do the needful',
                  description: 'local Nigerian food',
                  foodImg: 'someurl',
                  category: 'rice'
                })
                .set('x-access-token', xtoken)
                .expect(201)
                .end(() => {
                  done();
                });
            });
        });
    }).catch((errors) => {
      done(errors);
    });
  });
  // before((done) => {
  //   request(app)
  //     .post('/api/v1/users/signup')
  //     .send(seed.setUserInput(
  //       'emasys',
  //       'endy',
  //       'Page Admin',
  //       'emasysnd@gmail.com',
  //       'password',
  //       'password',
  //       'Nigeria',
  //       'admin',
  //       'avatarurl',
  //     ))
  //     .expect(201)
  //     .end(() => { done(); });
  // });

  // before((done) => { // A user should sign in before creating a creating a recipe
  //   request(app)
  //     .post('/api/v1/users/signin')
  //     .send(seed.setLogin('emasysnd@gmail.com', 'password'))
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       xtoken = res.body.token; // make token accessible to protected routes
  //       done();
  //     });
  // });

  // before((done) => {
  //   request(app)
  //     .post('/api/v1/recipes')
  //     .send(seed.setRecipeInput(
  //       'How to fry something',
  //       'water, oil',
  //       'just do it',
  //       'local food',
  //       'some url',
  //       'vegetarian',
  //     ))
  //     .set('x-access-token', xtoken)
  //     .expect(201)
  //     .end(() => { done(); });
  // });

  describe('GET/ fetch all recipes', () => {
    it('should return all recipes in the database', (done) => {
      request(app)
        .get('/api/v1/recipes/page/2')
        .expect(200)
        .end(done);
    });
  });

  describe('GET/ fetch a single recipe', () => {
    it('should return a single recipe', (done) => {
      request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('GET/ fetch a single recipe', () => {
    it('should return a status 404 if recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipes/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });

  describe('POST/ search for a recipe', () => {
    it('should return status code 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipeSearch')
        .send({ query: 'water' })
        .expect(200)
        .end(done);
    });
  });

  describe('POST/ add a new recipe', () => {
    it('should return a status code of 201 if user is authorized and query is successful', (done) => {
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
        .set('x-access-token', xtoken)
        .expect(201)
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
        .end(done);
    });
  });

  describe('POST/ update an existing recipe', () => {
    it('should return a status code of 204 if a recipe is updated', (done) => {
      request(app)
        .post('/api/v1/recipes/1')
        .send(seed.setUpdateRecipe('How to fry something', 'water, oil', 'just do it', 'local food'))
        .set('x-access-token', xtoken)
        .expect(204)
        .end(done);
    });
  });

  describe('POST/ update an existing recipe', () => {
    it('should return a status code of 404 if a recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/5')
        .send(seed.setUpdateRecipe('How to fry something', 'water, oil', 'just do it', 'local food'))
        .set('x-access-token', xtoken)
        .expect(404)
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
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 400 if a recipe to be reviewed is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(400)
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 401 if review is empty', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: '' })
        .set('x-access-token', xtoken)
        .expect(401)
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 401 if a review is not successfully added due to wrong keyword', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ contents: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(401)
        .end(done);
    });
  });

  describe('Favorite a recipe', () => {
    it('should return a status code of 200 if a recipe is successfully favorited', (done) => {
      request(app)
        .post('/api/v1/recipes/1/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Favorite a recipe again', () => {
    it('should return a status code of 200 if a recipe is successfully unfavorited', (done) => {
      request(app)
        .post('/api/v1/recipes/1/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Favorite a recipe', () => {
    it('should return a status code of 404 if a recipe to be favorited is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/fav')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });


  describe('Get All User\'s favortes', () => {
    it('should return a status code of 200 if all user recipes are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/recipes/fav')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('GET/ check if a user has favorited this recipe', () => {
    it('should return a status code of 200 and "true" if a user has add the recipe to his favorite list', (done) => {
      request(app)
        .get('/api/v1/recipes/1/favStatus')
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
        .end(done);
    });
  });

  describe('Check if a user has either upvote or downvoted', () => {
    it('should return a status code of 200 if user has not done any', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Check if a user has either upvote or downvoted', () => {
    it('should return a status code of 404 if the recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });

  describe('Upvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Check if a user has upvoted', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Upvote a recipe again', () => {
    it('should return a status code of 200 if previous upvote is successfully cancelled', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });


  describe('Downvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Check if a user has downvoted', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Upvote a recipe again and again', () => {
    it('should return a status code of 200 if a fresh upvote is successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Downvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Downvote a recipe again', () => {
    it('should return a status code of 200 if the previous reaction is successfull cancelled out', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Upvote a recipe', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });

  describe('Downvote a recipe', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });


  describe('Check if a user has created a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/yours/1/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('DELETE/ a recipe', () => {
    it('should return a status code of 200 if recipe is successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('DELETE/ a recipe', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .delete('/api/v1/recipes/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .end(done);
    });
  });
});
