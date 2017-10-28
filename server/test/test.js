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
      .post('/api/v1/recipes')
      .send(recipe)
      .expect(201)
      .end(done);
  });

  it('should return 501 status code for api/recipe if one of the required field is empty', (done) => {
    const recipe = {
      title: 'how to cook something',
      ingredients: 'water',
      direction: 'just do it',
    };
    request(app)
      .post('/api/v1/recipes')
      .send(recipe)
      .expect(501)
      .end(done);
  });
});

describe('POST/ reviews', () => {
  it('should return 201 status code for a successful comment', (done) => {
    const recipe = {
      id: 'aec6958e-69ae-4c1e-9394-1b4d5fd54401'
    };
    const newComment = {
      comments: 'nice work',
      commenter: 'jane doe'
    };
    request(app)
      .post(`/api/v1/recipes/${recipe.id}/reviews`)
      .send(newComment)
      .expect(200)
      .end(done);
  });

  it('should return 501 status code for an unsuccessful comment', (done) => {
    const recipe = {
      id: 'aec6958e-69ae-4c1e-9394-1b4d5fd54401121' // made the id invalid
    };
    const newComment = {
      comments: 'nice work',
      commenter: 'jane doe'
    };
    request(app)
      .post(`/api/v1/recipes/${recipe.id}/reviews`)
      .send(newComment)
      .expect(501)
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
      .put(`/api/v1/recipes/${recipe.id}`)
      .send(editRecipe)
      .expect(204)
      .end(done);
  });

  it('should fail to update a recipe with a wrong id', (done) => {
    const recipe = {
      id: 'aec6958e-69ae-4c1e-9394-1b4d5fd544065',
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
      .put(`/api/v1/recipes/${recipe.id}`)
      .send(editRecipe)
      .expect(404)
      .end(done);
  });
});

describe('DELETE/recipe:id', () => {
  it('should be able to delete a recipe with it\'s id', (done) => {
    const recipe = {
      id: 'aec6958e-69ae-4c1e-9394-1b4d5fd54401',
      title: 'how to cook beans',
      ingredients: 'water,salt,peper',
      direction: 'boil the beans and add salt to taste',
    };
    request(app)
      .del(`/api/v1/recipes/${recipe.id}`)
      .expect(204)
      .end(done);
  });
});

describe('GET/ recipes', () => {
  it('should return 200 status code api/recipe', (done) => {
    request(app)
      .get('/api/v1/recipes')
      .expect(200)
      .end(done);
  });

  it('should return 200 status code', (done) => {
    request(app)
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .expect(200)
      .end(done);
  });

  it('should return 404 status code if you try to access an invalid endpoint', (done) => {
    request(app)
      .get('/api/recip')
      .expect(404)
      .end(done);
  });
});

