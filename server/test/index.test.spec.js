import request from 'supertest';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import expect from 'expect';
import app from '../index';
import seed from '../seeders/seeds';
import models, { Users } from '../models';

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


describe('SIGN_UP/', () => {
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
        .then(() => done())
        .catch(err => done(err));
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
  //     .end(() => {
  //       done();
  //     });
  // });

  it('should return status code 400 and a message if the email format is invalid', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'emasys', password: 'password' })
      .expect(400)
      .end(() => {
        done();
      });
  });

  it('should return status code 404 if the email does not exist', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'emasysnd2@gmail.com', password: 'password' })
      .expect(404)
      .end(() => {
        done();
      });
  });

  it('should return 200 and a decoded token if credentials are correct.', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'emasysnd@gmail.com', password: 'password' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.firstName, 'emasys');
        done();
      });
  });
});

