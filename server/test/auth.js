import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import models from '../models';

let firstToken = null;

const signUp = () => {
  before((done) => {
    models.sequelize
      .sync({ force: true })
      .then(() => {
        done(null);
      })
      .catch((errors) => {
        done(errors);
      });
  });

  describe('Create two users', () => {
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
          .end((err, res) => {
            if (!err) {
              expect(res.body).to.include({ success: true });
              firstToken = res.body.token;
            }
            done();
          });
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
            }
          })
          .end(done);
      });
    });

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
  });
};

export default signUp;

