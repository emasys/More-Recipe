import request from 'supertest';
import { expect } from 'chai';
import app from '../index';

describe('Test suite for middleware', () => {
  it('should return status code 400 if successful', (done) => {
    request(app)
      .get('/api/v1/users/very')
      .expect(400)
      .expect((res) => {
        expect(res.body).to.deep.equal({ error: 'invalid params' });
      })
      .end(done);
  });
});
