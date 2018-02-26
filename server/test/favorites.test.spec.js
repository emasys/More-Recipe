import request from 'supertest';
import { expect } from 'chai';
import app from '../index';

let firstToken = null;

describe('Generate token', () => {
  describe('sign in a user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'emasysnd@gmail.com', password: 'password' })
        .expect(200)
        .end((err, res) => {
          if (!err) {
            firstToken = res.body.token;
          }
          done();
        });
    });
  });
});
describe('Test suite for favorite controller', () => {
  describe('Add a recipe to the database', () => {
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
        .set('more-recipe-access', firstToken)
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });
  describe('Favorite a recipe', () => {
    it('should return a status code of 200 if a recipe is successfully favorited', (done) => {
      request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'favorited' });
        })
        .end(done);
    });
  });

  describe('Check favorite status,', () => {
    it('should return an array of users that added this recipe to their favorite list', (done) => {
      request(app)
        .get('/api/v1/recipes/reaction/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.recipe.favorites).to.be.an('array');
        })
        .end(done);
    });
  });

  describe('Check favorite status of a recipe not in the database,', () => {
    it('should return an error message', (done) => {
      request(app)
        .get('/api/v1/recipes/reaction/10')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: 'Recipes not found'
          });
        })
        .end(done);
    });
  });
  describe('Favorite a recipe again', () => {
    it('should return a status code of 200 if a recipe is successfully removed from favorite list', (done) => {
      request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'cancelled' });
        })
        .end(done);
    });
  });

  describe('Favorite a recipe', () => {
    it('should return a status code of 404 if a recipe to be added to favorite list is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/favorite')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({
            success: false,
            message: 'recipe not found'
          });
        })
        .end(done);
    });
  });

  describe("Get all user's favorite recipes,", () => {
    it('should return a status code of 200 if all user recipes are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/favorites')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .end(done);
    });
  });
});
