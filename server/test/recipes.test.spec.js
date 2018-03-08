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
          expect(res.body).to.deep.equal({
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
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            error: { name: ['The name field is required.'] }
          });
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
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            error: 'Already Added'
          });
        })
        .end(done);
    });
  });

  describe('fetch all recipes:', () => {
    it('should return all recipes in the database', (done) => {
      request(app)
        .get('/api/v1/recipes?limit=2&offset=0')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({
            success: true
          });
          expect(res.body.recipes).to.be.an('Array');
          expect(res.body.recipes).to.have.lengthOf(1);
        })
        .end(done);
    });
  });


  describe('fetch all recipes from a particular category:', () => {
    it('should return an empty array if filtered by category not yet available', (done) => {
      request(app)
        .get('/api/v1/recipes?limit=2&category=rice')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({
            success: true
          });
          expect(res.body.recipes).to.be.an('array');
          expect(res.body.recipes).to.have.lengthOf(0);
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
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.recipe.views).to.be.equal(0);
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
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.recipe.views).to.be.equal(1);
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
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.recipes).to.be.a('array');
          expect(res.body.recipes).to.have.length.of.at.most(1);
          expect(res.body.recipes[0].ingredients).to.contain('water');
        })
        .end(done);
    });
  });

  describe('Update an existing recipe', () => {
    it('should return a status code of 200 if a recipe is updated', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'fried yam updated',
          direction: 'how to cook it very well',
          ingredients: 'water, salt, oil'
        })
        .set('more-recipe-access', firstToken)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.recipe.name).to.equal('fried yam updated');
          expect(res.body.recipe.direction).to.equal('how to cook it very well');
          expect(res.body.recipe.ingredients).to.be.an('array');
          expect(res.body.recipe.ingredients).to.have.lengthOf(3);
          expect(res.body.recipe.ingredients).to.contain('water', 'salt', 'oil');
        })
        .end(done);
    });
  });

  describe('Update an existing recipe with an already existing name', () => {
    it('should return fail to update the recipe', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'fried yam updated',
        })
        .set('more-recipe-access', firstToken)
        .expect(409)
        .expect((res) => {
          expect(res.body).to.be.deep.equal({
            success: false,
            message: 'you already have a recipe with the same name'
          });
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
          expect(res.body).to.deep.equal({ success: false, status: 'cannot update this recipe' });
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
            message: 'Not found'
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
        .expect((res) => {
          expect(res.body).to.include({ success: true });
          expect(res.body.reviewedRecipe.content).to.be.equal('just added a comment');
          expect(res.body.recipe.comments).to.be.equals(1);
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

  describe('Post a review', () => {
    it('should return a status code of 422 if review is empty', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({ content: '' })
        .set('more-recipe-access', firstToken)
        .expect(422)
        .expect((res) => {
          expect(res.body).to.deep.equal({
            success: false,
            status: {
              content: [
                'The content field is required.'
              ]
            }
          });
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
          expect(res.body.recipe.upvote).to.equal(1);
          expect(res.body.recipe.reactionUp).to.contain(1);
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
          expect(res.body.recipe.upvote).to.equal(0);
          expect(res.body.recipe.reactionUp).to.not.contain(1);
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
          expect(res.body.recipe.downvote).to.equal(1);
          expect(res.body.recipe.reactionDown).to.contain(1);
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
          expect(res.body.recipe.downvote).to.equal(0);
          expect(res.body.recipe.reactionDown).to.not.contain(1);
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
          expect(res.body.recipe.upvote).to.equal(1);
          expect(res.body.recipe.reactionUp).to.contain(1);
          expect(res.body.recipe.downvote).to.equal(0);
          expect(res.body.recipe.reactionDown).to.not.contain(1);
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
          expect(res.body.recipe.downvote).to.equal(1);
          expect(res.body.recipe.reactionDown).to.contain(1);
          expect(res.body.recipe.upvote).to.equal(0);
          expect(res.body.recipe.reactionUp).to.not.contain(1);
        })
        .end(done);
    });
  });

  describe('Upvote a recipe that does not exist,', () => {
    it('should return a status code of 404 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/upvote/10')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({ success: false, message: 'Not found' });
        })
        .end(done);
    });
  });

  describe('Downvote a recipe that does not exist,', () => {
    it('should return a status code of 404 if recipe does not exist', (done) => {
      request(app)
        .post('/api/v1/recipes/downvote/10')
        .set('more-recipe-access', firstToken)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.deep.equal({ success: false, message: 'Not found' });
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
          expect(res.body.recipes).to.be.an('array');
          expect(res.body.recipes).to.have.lengthOf(1);
          expect(res.body.recipes[0].userId).to.equal(1);
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
          expect(res.body).to.include({ success: false, error: 'invalid input syntax for integer: "u"' });
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
          expect(res.body).to.deep.equal({ success: true, status: 'Recipe deleted' });
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
          expect(res.body).to.deep.equal({ success: false, message: 'Not found' });
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
      .expect((res) => {
        expect(res.body).to.deep.equal({ error: 'invalid params' });
      })
      .end(done);
  });

  it('should return status code 400 if the param is not a number', (done) => {
    request(app)
      .get('/api/v1/recipes/string')
      .set('more-recipe-access', firstToken)
      .expect(400)
      .expect((res) => {
        expect(res.body).to.deep.equal({ error: 'invalid params' });
      })
      .end(done);
  });

  it('should return status code 400 if the param is not a number', (done) => {
    request(app)
      .delete('/api/v1/reviews/delete/string')
      .set('more-recipe-access', firstToken)
      .expect(400)
      .expect((res) => {
        expect(res.body).to.deep.equal({ error: 'invalid params' });
      })
      .end(done);
  });

  it('should return status code 401 if token is not provided', (done) => {
    request(app)
      .get('/api/v1/reviews/string')
      .expect(401)
      .expect((res) => {
        expect(res.body).to.deep.equal({ error: 'Invalid authorization status' });
      })
      .end(done);
  });
});
