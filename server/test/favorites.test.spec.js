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
          category: 'pasta',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('more-recipe-access', firstToken)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.recipe).to.be.an('object');
          expect(res.body.recipe.name).to.equal('fried yam');
          expect(res.body.recipe.direction).to.equal('how to cook it');
          expect(res.body.recipe.description).to.equal('regular food');
          expect(res.body.recipe.category).to.equal('pasta');
          expect(res.body.recipe.ingredients).to.be.an('array');
          expect(res.body.recipe.ingredients).to.have.lengthOf(2);
          expect(res.body.recipe.ingredients).to.contain('water', 'salt');
        })
        .end(done);
    });
  });
  describe('Favorite a recipe', () => {
    it('should return check if a recipe is successfully added into user favorite list', (done) => {
      request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'favorited', success: true });
          expect(res.body).to.be.an('object');
          expect(res.body.recipe.favorite).to.equal(1);
        })
        .end(done);
    });
  });

  describe('Check favorite status,', () => {
    it('should return contain an array of users that added this recipe to their favorite list', (done) => {
      request(app)
        .get('/api/v1/recipes/reaction/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.recipe.favorites).to.be.an('array');
          expect(res.body.recipe.favorites).to.have.length(1);
        })
        .end(done);
    });
  });
  describe('Remove a recipe from favorite list', () => {
    it('should return a check if a recipe is successfully removed from favorite list', (done) => {
      request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ status: 'cancelled', success: true });
          expect(res.body).to.be.an('object');
          expect(res.body.recipe.favorite).to.equal(0);
        })
        .end(done);
    });
  });

  describe('Check if a recipe not in the database can be added to a user favorite list,', () => {
    it('should return an error message', (done) => {
      request(app)
        .get('/api/v1/recipes/reaction/10')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            message: 'Not found'
          });
        })
        .end(done);
    });
  });

  describe('Add a non-existing recipe into user favorite list', () => {
    it('should return an error message if a recipe to be added to favorite list is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/5/favorite')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            message: 'Not found'
          });
        })
        .end(done);
    });
  });

  describe("Get all user's favorite recipes,", () => {
    it('should return an array of all user recipes', (done) => {
      request(app)
        .get('/api/v1/favorites')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({
            success: true,
            count: 0
          });
          expect(res.body.favorites).to.be.an('Array');
        })
        .end(done);
    });
  });
});
