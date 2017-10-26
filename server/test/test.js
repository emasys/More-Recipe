// import request from 'supertest';
import request from 'supertest';
import app from '../index';

describe('POST/ recipes', () => {
  it('should return 201 status code for api/recipe', (done) => {
    const recipe = {
      title: 'how to cook something',
      ingredients: 'water',
      direction: 'just do it',
      category: 'none'
    };
    request(app)
      .post('/api/recipes')
      .send(recipe)
      .expect(201)
      .end(done);
  });
});

describe('PUT/recipe:id Update any recipe', () => {
  it('should be able to update a recipe with it\'s id', (done) => {
    const recipe = {
      id: 'aec6958e-69ae-4c1e-9394-1b4d5fd54401',
      title: 'how to cook beans',
      ingredients: 'water,salt,peper',
      direction: 'boil the beans and add salt to taste',
    };

    const editRecipe = {
      title: 'how to cook something else',
      ingredients: 'water, salt, peper',
      direction: 'boil the beans and add salt to taste',
    };
    request(app)
      .put(`/api/recipes/${recipe.id}`)
      .send(editRecipe)
      .expect(204)
      .end(done);
  });
});

describe('GET/ recipes', () => {
  it('should return 200 status code api/recipe', (done) => {
    request(app)
      .get('/api/recipes')
      .expect(200)
      .end(done);
  });

  it('should return 200 status code', (done) => {
    request(app)
      .get('/api/recipes?sort=upvotes&order=des')
      .expect(200)
      .end(done);
  });
});

