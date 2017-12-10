import request from 'supertest';
// import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import expect from 'expect';
import app from '../index';
import seed from '../seeders/seeds';

process.env.NODE_ENV = 'test';
let xtoken = null;

describe('GET/ test if the invalid routes are working', () => {
  it('should return status code 404 and a message "page not found"', (done) => {
    request(app)
      .get('/api/v1/recipe/misplaced')
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({
          error: 'page not found',
        });
      })
      .end(done);
  });
});

describe('CRUD/ users', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);
  before((done) => { // A user should sign in before creating a creating a recipe
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasysnd@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        xtoken = res.body.token; // make token accessible to protected routes
        done();
      });
  });
  describe('Test case for empty firstName field', () => {
    it('should return status code 401 when firstName input field is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('', 'Jane', "John's wife", 'janedoe@gmail.com', 'password', 'password'))
        .expect(401)
        .end(done);
    });
  });

  describe('Test for invalid inputs', () => {
    it('should return status code 401 if firstName input is not a string', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput(
          1234,
          'Jane',
          "John's wife",
          'janedoe@gmail.com',
          'password',
          'password',
        ))
        .expect(401)
        .end(done);
    });
  });

  describe('Test for a successful entry', () => {
    it('should return status code 201 if data is saved into the database', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput(
          'Doe',
          'Jane',
          "John's wife",
          'janedoe@gmail.com',
          'password',
          'password',
          'Nigeria',
          'someguy',
          'avatarurl',
        ))
        .expect(201)
        .end(done);
    });
  });

  describe('Test for invalid email address', () => {
    it('should return status code 401 if email input format is not valid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('jane', 'Jane', "John's wife", 'janedoe@gamil', 'password', 'password'))
        .expect(401)
        .end(done);
    });
  });

  describe('GET/ all user info', () => {
    it('should return a status code of 200 if all user info are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('GET/ one user info', () => {
    it('should return a status code of 200 if a user info is successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .expect(200)
        .end(done);
    });
  });

  describe('UPDATE/ a user info', () => {
    it('should return a status code of 200 if all user info is successfully updated', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .send(seed.setUserInput('emasys', 'endy', 'I am emasys nd'))
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('DELETE/ a user', () => {
    it('should return a status code of 200 if all user info are successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });
});


describe('SIGN_IN/ New user can sign in', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  it('should return status code 400 and a message if the email format is invalid', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasys', 'password'))
      .expect(400)
      .end(done);
  });

  it('should return status code 404 if the email does not exist', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasys@gmail.com', 'password'))
      .expect(404)
      .end(done);
  });

  it('should return 200 and a decoded token if credentials are correct.', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasysnd@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.firstName, 'Ndukwe');
        done();
      });
  });
});

describe('CRUD/ for recipes', () => {
  before(seed.emptyUserTable);
  before(seed.emptyRecipeTable);
  before(seed.addUser);
  before(seed.addRecipe);

  before((done) => { // A user should sign in before creating a creating a recipe
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasysnd@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        xtoken = res.body.token; // make token accessible to protected routes
        done();
      });
  });

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
    it('should return a status code of 404 if a recipe to be reviewed is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(404)
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

  describe('Upvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
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

  describe('Check if a user has reacted', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/upvoteReaction/1')
        .set('x-access-token', xtoken)
        .expect(200)
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
