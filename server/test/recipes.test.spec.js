import request from 'supertest';
import { expect } from 'chai';
import app from '../index';


let firstToken = null;
let secondToken = null;
describe('Test suite for recipe controller:', () => {
  describe('sign in the first new user to generate token', () => {
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

  describe('sign in the second new user to generate token', () => {
    it('should return status code 200 if a user is successfully logged in', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'emasys@gmail.com', password: 'password' })
        .expect(200)
        .end((err, res) => {
          if (!err) {
            secondToken = res.body.token;
          }
          done();
        });
    });
  });

  describe('check if invalid routes are working', () => {
    it('should return status code 404 and a message "page not found"', (done) => {
      request(app)
        .get('/api/v1/recipesds/misplaced')
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({
            error: 'page not found',
          });
        })
        .end(done);
    });
  });

  describe('add a new recipe, skip the name', () => {
    it('should return a status code of 422 because the name is required', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          direction: 'how to cook it',
          description: 'regular food',
          category: 'yam',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('more-recipe-access', firstToken)
        .expect(422)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Re-add a recipe that already exist', () => {
    it('should return a status code 403 and fail to add a duplicate recipe', (done) => {
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
        .expect(403)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.deep.equal({
              success: false,
              error: 'Already Added'
            });
          }
        })
        .end(done);
    });
  });

  describe('fetch all recipes:', () => {
    it('should return all recipes in the database', (done) => {
      request(app)
        .get('/api/v1/recipes?limit=2&offset=0')
        .expect(200)
        .end(done);
    });
  });

  describe('fetch all recipes from a particular category:', () => {
    it('should return all recipes in the database, filtered by category', (done) => {
      request(app)
        .get('/api/v1/recipes?limit=2&offset=0&category=pasta')
        .expect(200)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.include({ success: true, recipe: { category: 'pasta' } });
          }
        })
        .end(done);
    });
  });

  describe('fetch a single recipe without view count', () => {
    it('should return a single recipe without an increment in the view count', (done) => {
      request(app)
        .get('/api/v1/recipes/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to.include({ success: true, recipe: { views: 0 } });
          }
        })
        .end(done);
    });
  });

  describe('fetch a single recipe with view count', () => {
    it('should return a single recipe with an increment in the view count', (done) => {
      request(app)
        .get('/api/v1/recipes/1')
        .set('more-recipe-access', secondToken)
        .expect(200)
        .expect((err, res) => {
          if (!err) {
            expect(res.body).to
              .include({ success: true, recipe: { views: 1 } });
          }
        })
        .end(done);
    });
  });

  describe('fetch a single recipe that does not exist', () => {
    it('should return a status 404 if recipe is not found', (done) => {
      request(app)
        .get('/api/v1/recipes/5')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false, status: 'Recipes not found' });
        })
        .end(done);
    });
  });

  describe('search for a recipe', () => {
    it('should return status code 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes?limit=2&offset=0&search=water')
        .expect(200)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Update an existing recipe', () => {
    it('should return a status code of 200 if a recipe is updated', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'fried yam',
          direction: 'how to cook it',
          description: 'regular food',
          category: 'yam',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Update a recipe created by another user', () => {
    it('should return a status code of 401', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'fried yam',
          direction: 'how to cook it',
          description: 'regular food',
          category: 'yam',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('more-recipe-access', secondToken)
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false, status: 'cannot update this recipe' });
        })
        .end(done);
    });
  });

  describe('Update a non-existing recipe', () => {
    it('should return a status code of 404 if a recipe does not exist', (done) => {
      request(app)
        .put('/api/v1/recipes/50')
        .send({
          name: 'fried yam',
          direction: 'how to cook it',
          description: 'regular food',
          category: 'yam',
          foodImg: 'http://example.com',
          ingredients: 'water, salt'
        })
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            error: 'recipe not found'
          });
        })
        .end(done);
    });
  });

  describe('Post a review for an existing recipe', () => {
    it('should return a status code of 201 if a review is successfully added', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: 'just added a comment' })
        .set('more-recipe-access', firstToken)
        .expect(201)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Post a review for a non-existing recipe', () => {
    it('should return a status code of 500 if a recipe to be reviewed does\'s exist', (done) => {
      request(app)
        .post('/api/v1/recipes/5/reviews')
        .send({ content: 'just added a comment' })
        .set('more-recipe-access', firstToken)
        .expect(500)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 422 if review is empty', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: '' })
        .set('more-recipe-access', firstToken)
        .expect(422)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Post a review', () => {
    it('should return a status code of 422 if a review is not successfully added due to wrong keyword', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ contents: 'just added a comment' })
        .set('more-recipe-access', firstToken)
        .expect(422)
        .expect((err, res) => {
          if (!err) expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe,', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe again', () => {
    it('should return a status code of 200 if previous upvote is successfully cancelled', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'cancelled' });
        })
        .end(done);
    });
  });


  describe('Downvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe again', () => {
    it('should return a status code of 200 if previous downvote is successfully cancelled', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'cancelled' });
        })
        .end(done);
    });
  });
  describe('Downvote a recipe', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });
  describe('Upvote a recipe after initially downvoting it,', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'voted' });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe after initially upvoting it,', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true, status: 'voted' });
        })
        .end(done);
    });
  });

  describe('Upvote a recipe that does not exist,', () => {
    it('should return a status code of 500 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/10')
        .set('more-recipe-access', firstToken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe that does not exist,', () => {
    it('should return a status code of 500 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/10')
        .set('more-recipe-access', firstToken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });
  describe('GET the list of all user\'s recipes', () => {
    it('should return a status code of 200 if successful', (done) => {
      request(app)
        .get('/api/v1/recipes/user/1?limit=2&offset=0')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('GET the list of all user\'s recipes, with a typo', () => {
    it('should return a status code of 500 due to the typo', (done) => {
      request(app)
        .get('/api/v1/recipes/user/1?limit=u&offset=0')
        .set('more-recipe-access', firstToken)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.include({ success: false, error: 'something went wrong' });
        })
        .end(done);
    });
  });

  describe('Delete a recipe by another user,', () => {
    it('should return a status code of 401 if recipe was not created by the user', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('more-recipe-access', secondToken)
        .expect(401)
        .expect((res) => {
          expect(res.body).to.include({ success: false, status: 'cannot delete this recipe' });
        })
        .end(done);
    });
  });

  describe('Delete a recipe,', () => {
    it('should return a status code of 200 if recipe is successfully deleted', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
        })
        .end(done);
    });
  });

  describe('Delete a recipe,', () => {
    it('should return a status code of 404 if recipe is not found', (done) => {
      request(app)
        .delete('/api/v1/recipes/5')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.include({ success: false });
        })
        .end(done);
    });
  });
});

describe('Test suite for middleware', () => {
  it('should return status code 400 if the param is not a number', (done) => {
    request(app)
      .get('/api/v1/users/string')
      .expect(400)
      .expect((err, res) => {
        if (!err) expect(res.body).to.include({ success: false });
      })
      .end(done);
  });

  it('should return status code 400 if the param is not a number', (done) => {
    request(app)
      .get('/api/v1/recipes/string')
      .set('more-recipe-access', firstToken)
      .expect(400)
      .expect((err, res) => {
        if (!err) expect(res.body).to.include({ success: false });
      })
      .end(done);
  });

  it('should return status code 400 if the param is not a number', (done) => {
    request(app)
      .delete('/api/v1/reviews/delete/string')
      .set('more-recipe-access', firstToken)
      .expect(400)
      .expect((err, res) => {
        if (!err) expect(res.body).to.include({ success: false });
      })
      .end(done);
  });

  it('should return status code 400 if token is not provided', (done) => {
    request(app)
      .get('/api/v1/reviews/string')
      .expect(403)
      .expect((err, res) => {
        if (!err) expect(res.body).to.include({ success: false });
      })
      .end(done);
  });
});
