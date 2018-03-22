import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import signUp from './auth';

let firstToken = null;

describe('Test suite for user controller', () => {
  signUp();
  describe('Sign in a new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'emasysnd@gmail.com', password: 'password' })
        .expect(200)
        .expect((res) => {
          // make token accessible to protected routes
          firstToken = res.body.token;
        })
        .end(done);
    });
  });

  describe('Test for invalid email address,', () => {
    it('should return status code 422 if email input format is not valid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'emasys@gmailcom',
          password: 'password',
          confirmPassword: 'password',
          moniker: 'admin2'
        })
        .expect(422)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: {
              email: ['The email format is invalid.']
            }
          });
        })
        .end(done);
    });
  });

  describe('Signin with invalid credential,', () => {
    it('should return 400 if a user password is wrong', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'emasysnd@gmail.com', password: 'wrongpassword' })
        .expect(400)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: 'Invalid email/password'
          });
        })
        .end(done);
    });
  });

  describe('Signin with invalid credential,', () => {
    it('should return 400 if email field is not available', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ password: 'wrongpassword' })
        .expect(400)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: {
              email: ['The email field is required.']
            }
          });
        })
        .end(done);
    });
  });
  describe('Send token to reset password,', () => {
    it('should return status code 200 token is successfully sent to the user', (done) => {
      request(app)
        .post('/api/v1/reset')
        .send({ email: 'emasysnd@gmail.com' })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: true,
            status: 'token sent'
          });
        })
        .end(done);
    });
  });

  describe('Change user password,', () => {
    it('should return status code 200 if password is successfully changed', (done) => {
      request(app)
        .put('/api/v1/users/changepassword')
        .send({ email: 'emasys@gmail.com', password: 'password' })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: true,
            status: 'updated'
          });
        })
        .end(done);
    });
  });

  describe('Get user info of all the users', () => {
    it('should return a status code of 200 if all user info are successfully fetched', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0]).to.include({
            email: 'emasysnd@gmail.com',
            moniker: 'admin',
            id: 1
          });
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
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.include({
            email: 'emasysnd@gmail.com',
            moniker: 'admin',
            id: 1
          });
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
        .send({ firstName: 'emasys', lastName: 'endy', Bio: 'I am emasys nd' })
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: true,
            status: 'updated'
          });
        })
        .end(done);
    });

    it('should return a status code of 422 if the firstName field have invalid characters', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .send({ firstName: 123, lastName: 'endy', Bio: 'I am emasys nd' })
        .set('more-recipe-access', firstToken)
        .expect(422)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: {
              firstName: [
                'The firstName field must contain only alphabetic characters.'
              ]
            }
          });
        })
        .end(done);
    });
  });

  describe('Update user info of a non-existing user,', () => {
    it('should return a status code of 404 if user is not found', (done) => {
      request(app)
        .put('/api/v1/users/5')
        .send({ firstName: 'emasys', lastName: 'endy', Bio: 'I am emasys nd' })
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            error: 'User not found'
          });
        })
        .end(done);
    });
  });

  describe('Delete a user that does not exist,', () => {
    it('should return a status code of 404', (done) => {
      request(app)
        .delete('/api/v1/users/5')
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

  describe('Delete a user that exists,', () => {
    it('should return a status code of 200 if all user info are successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: true,
            status: 'user deleted'
          });
        })
        .end(done);
    });
  });
});
