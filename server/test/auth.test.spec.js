import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import models from '../models';

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
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.include({ success: true });
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
          }
        })
        .end(done);
    });
  });
});

