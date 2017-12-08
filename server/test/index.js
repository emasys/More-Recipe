import request from 'supertest';
// import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import expect from 'expect';
import app from '../index';
import seed from '../seeders/seeds';

let xtoken = null;

// dotEnv.config();

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

describe('POST/ add new user', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  describe('Test case for empty firstName field', () => {
    it('should return status code 401 when firstName input field is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('', 'Jane', "John's wife", 'janedoe@gmail.com', 'password', 'password'),)
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
        ),)
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
        ),)
        .expect(201)
        .end(done);
    });
  });

  describe('Test for invalid email address', () => {
    it('should return status code 401 if email input format is not valid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('jane', 'Jane', "John's wife", 'janedoe@gamil', 'password', 'password'),)
        .expect(401)
        .end(done);
    });
  });
});

describe('POST/ New user can sign in', () => {
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

describe('Test suite for recipes', () => {
  // let userId;
  before(seed.emptyUserTable);
  before(seed.emptyRecipeTable);
  before(seed.addUser);
  beforeEach(seed.addRecipe);

  before((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('emasysnd@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        xtoken = res.body.token;
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
        .get('/api/v1/recipes/2')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  // describe('POST/ search for a recipe', () => {
  //   it('should return status code 200 if successful', (done) => {
  //     request(app)
  //       .post('/api/v1/recipes/search')
  //       .send({ query: 'water' })
  //       .expect(200)
  //       .end(done);
  //   });
  // });

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
        .send(seed.setUpdateRecipe('How to fry something', 'water, oil', 'just do it', 'local food'),)
        .set('x-access-token', xtoken)
        .expect(204)
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 200 if a review is successfully added', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: 'just added a comment' })
        .set('x-access-token', xtoken)
        .expect(201)
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

  describe('Get user info', () => {
    it('should return a status code of 200 if all user info are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('x-access-token', xtoken)
        .expect(200)
        .end(done);
    });
  });

  describe('Get one user info', () => {
    it('should return a status code of 200 if a user info is successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users/1')
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
        .post('/api/v1/recipes/upvote/1')
        .set('x-access-token', xtoken)
        .expect(200)
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

});
