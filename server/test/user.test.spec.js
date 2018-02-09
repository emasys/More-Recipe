import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import seed from '../seeders/seeds';

let xtoken = null;


describe('Test suite for user controller', () => {
  describe('Sign in a new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            // make token accessible to protected routes
            xtoken = res.body.token;
          }
          done();
        });
    });
  });

  describe('Test for invalid email address,', () => {
    it('should return status code 422 if email input format is not valid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('jane', 'Jane', "John's wife", 'janedoe@gamil', 'password', 'password'))
        .expect(422)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Signin with invalid credential,', () => {
    it('should return 400 if a user password is wrong', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'wrong password'))
        .expect(400)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe.skip('Send token to reset password,', () => {
    it('should return status code 200 token is successfully sent to the user', (done) => {
      request(app)
        .post('/api/v1/reset')
        .send({ email: 'emasysnd@gmail.com' })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'token sent' });
        })
        .end(done);
    });
  });

  describe('Get user info of all the users', () => {
    it('should return a status code of 200 if all user info are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Get user info of a single user,', () => {
    it('should return a status code of 200 if a user info is successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Get user info of an unregistered user,', () => {
    it('should return a status code of 404 if the user does not exist', (done) => {
      request(app)
        .get('/api/v1/users/10')
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Update user data of an authenticated user', () => {
    it('should return a status code of 200 if user data is successfully updated', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .send(seed.setUserInput('emasys', 'endy', 'I am emasys nd'))
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Update user info of a non-existing user,', () => {
    it('should return a status code of 404 if user is not found', (done) => {
      request(app)
        .put('/api/v1/users/5')
        .send(seed.setUserInput('emasys', 'endy', 'I am emasys nd'))
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Delete a user that does not exist,', () => {
    it('should return a status code of 404', (done) => {
      request(app)
        .delete('/api/v1/users/5')
        .set('x-access-token', xtoken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Delete a user that exists,', () => {
    it('should return a status code of 200 if all user info are successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('x-access-token', xtoken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });
});
