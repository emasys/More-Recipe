import request from 'supertest';
// import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
// import { assert, expect } from 'chai';
import expect from 'expect';
import app from '../index';
import test from '../seeders/seeds';

// let recipeToken;

// dotEnv.config();

describe('GET/ test if the invalid routes are working', () => {
  it('should return status code 404 and a message "page not found"', done => {
    request(app)
      .get('/api/v1/recipe/misplaced')
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({
          error: 'page not found'
        });
      })
      .end(done);
  });
});
describe('POST/ add new user', () => {
  before(test.emptyUserTable);
  before(test.addUser);

  describe('Test case for empty firstName field', () => {
    it('should return status code 401 when firstName input field is empty', done => {
      request(app)
        .post('/api/v1/users/signup')
        .send(
          test.setUserInput(
            '',
            'Jane',
            "John's wife",
            'janedoe@gmail.com',
            'password',
            'password'
          )
        )
        .expect(401)
        .end(done);
    });
  });

  describe('Test for invalid inputs', () => {
    it('should return status code 401 if firstName input is not a string', done => {
      request(app)
        .post('/api/v1/users/signup')
        .send(
          test.setUserInput(
            1234,
            'Jane',
            "John's wife",
            'janedoe@gmail.com',
            'password',
            'password'
          )
        )
        .expect(401)
        .end(done);
    });
  });

  describe('Test for a successful entry', () => {
    it('should return status code 201 if data is saved into the database', done => {
      request(app)
        .post('/api/v1/users/signup')
        .send(
          test.setUserInput(
            'Doe',
            'Jane',
            "John's wife",
            'janedoe@gmail.com',
            'password',
            'password'
          )
        )
        .expect(201)
        .end(done);
    });
  });

  describe('Test for invalid email address', () => {
    it('should return status code 401 if email input format is not valid', done => {
      request(app)
        .post('/api/v1/users/signup')
        .send(
          test.setUserInput(
            'jane',
            'Jane',
            "John's wife",
            'janedoe@gamil',
            'password',
            'password'
          )
        )
        .expect(401)
        .end(done);
    });
  });
});

describe('POST/ New user can sign in', () => {
  before(test.emptyUserTable);
  before(test.addUser);

  it('should return status code 400 and a message if the email format is invalid', done => {
    request(app)
      .post('/api/v1/users/signin')
      .send(test.setLogin('emasys', 'password'))
      .expect(400)
      .end(done);
  });

  it('should return status code 404 if the email does not exist', done => {
    request(app)
      .post('/api/v1/users/signin')
      .send(test.setLogin('emasys@gmail.com', 'password'))
      .expect(404)
      .end(done);
  });

  //   it('should return 201 and a decoded token if credentials are correct.', (done) => {
  //     request(app)
  //       .post('/api/v1/users/signin')
  //       .send(test.setLogin('emasysnd@gmail.com', 'password'))
  //       .expect(201)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         assert.exists(res.body);
  //         const decodedToken = jwtDecode(res.body.token);
  //         assert.equal(decodedToken.firstName, 'Ndukwe');
  //         done();
  //       });
  //   });
});

// describe('Test cases for recipes', () => {
//   // let userId;
//   before(test.emptyUserTable);
//   before(test.emptyRecipeTable);
//   before(test.addUser);
//   before(test.addRecipe);

//   before((done) => {
//     request(app)
//       .post('/api/v1/users/signin')
//       .send(test.setLogin('emasysnd@gmail.com', 'password'))
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         recipeToken = res.body.token;
//         done();
//       });
//   });

//   describe('POST/ add a new recipe', () => {
//     describe('validate user', () => {
//       it('should return a status code of 400 if user is not authorized', (done) => {
//         request(app)
//           .post('api/v1/recipes')
//           .send(test.setRecipeInput('Beancake', 'bean, pepper, onion', 'just grind the beans and boil'))
//           .expect(404)
//           .end(done);
//       });
//     });
//   });
// });
