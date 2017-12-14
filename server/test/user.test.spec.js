import request from 'supertest';
import { expect } from 'chai';
import app from '../index';
import seed from '../seeders/seeds';

let xtoken = null;


describe('CRUD/ users', () => {
  describe('SIGN_IN/ sign in a new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'password'))
        .expect(200)
        .end((err, res) => {
          if (!err) {
            xtoken = res.body.token; // make token accessible to protected routes
          }
          done();
        });
    });
  });


  describe('Test case for empty firstName field', () => {
    it('should return status code 401 when firstName input field is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('', 'Jane', "John's wife", 'janedoe@gmail.com', 'password', 'password'))
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Test for invalid inputs', () => {
    it('should return status code 401 if firstName input is not a string', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          firstName: 1234,
          lastName: 'Emmanuel',
          bio: 'I am a human from planet earth',
          email: 'emasysnd@gmail.com',
          password: 'password',
          confirmPassword: 'password',
          moniker: 'admin',
          country: 'Nigeria',
          avatar: 'someurl'
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Test for invalid email address', () => {
    it('should return status code 401 if email input format is not valid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seed.setUserInput('jane', 'Jane', "John's wife", 'janedoe@gamil', 'password', 'password'))
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('User signin', () => {
    it('should return 400 if a user is not successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seed.setLogin('emasysnd@gmail.com', 'passwords'))
        .expect(400)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('GET/ all user info', () => {
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

  describe('GET/ one user info', () => {
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

  describe('GET/ one user info', () => {
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

  describe('UPDATE/ a user info', () => {
    it('should return a status code of 200 if all user info is successfully updated', (done) => {
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

  describe('UPDATE/ a non-existence user info', () => {
    it('should return a status code of 404', (done) => {
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

  describe('DELETE/ a user that does not exist', () => {
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

  describe('DELETE/ a user', () => {
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
