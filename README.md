# More-Recipe 

[![Build Status](https://travis-ci.org/emasys/More-Recipe.svg?branch=develop)](https://travis-ci.org/emasys/More-Recipe) [![Coverage Status](https://coveralls.io/repos/github/emasys/More-Recipe/badge.svg?branch=test)](https://coveralls.io/github/emasys/More-Recipe?branch=test) [![Maintainability](https://api.codeclimate.com/v1/badges/bde1d7669abb744d5069/maintainability)](https://codeclimate.com/github/emasys/More-Recipe/maintainability)

More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Application Features
- Add a new recipe
- Modify and update recipes
- Delete a recipe
- View a catalog of all recipes
- Post a review for an existing recipe
- Add a recipe to Favorites
- Upvote or downvote a recipe

# Build Tools
- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

More features will be added soon




### Installation

This api requires [Node.js](https://nodejs.org/) v4+ to run.
Clone this repo, install the dependencies and devDependencies and start the server.

```sh
$ cd More-Recipe
$ npm install -d
$ npm start
```

To run Tests...

```sh
$ npm test
```

## Api Routes

### API endpoints for users to create accounts and login to the application:
  ```sh
    POST: /api/v1/v1/users/signup 
    POST: /api/v1/v1/users/signin
  ```
### An API route that allows authenticated user to add a recipe:
  ```sh
    POST: /api/v1/recipes
  ```
### An API route that allows any user to get list of all recipe:
  ```sh
    GET: /api/v1/recipes
  ```
### An API route that allows authenticated user to modify a recipe they added
  ```sh
     PUT: /api/v1/recipes/<recipeId>
  ```
### An API route that allows authenticated user to view a recipe they added
  ```sh
     GET: /api/v1/recipes/<recipeId>
  ```
### An API route that allows authenticated user to delete a recipe they added
  ```sh
     DELETE: /api/v1/recipes/<recipeId>
  ```
### An API route that allows a user to get all the recipes in the application
  ```sh
     GET: /api/v1/recipes
  ```
### An API route that allows an authenticated user post a review for a recipe
  ```sh
     POST: /api/v1/recipes/<recipeId>/reviews
  ```
### An API route that allows an authenticated user to get all his/her favorite recipes
  ```sh
    GET: /api/v1/users/recipes/<userId>/fav
  ```
### An API route that allows an authenticated user to add add a recipe to his/her favorite list
  ```sh
    POST: /api/v1/users/recipes/<recipeId>/fav
  ```

### An API route that allows an authenticated user to upvote a recipes
  ```sh
    GET: /api/v1/recipes/upvote/<recipeId>
  ```
### An API route that allows an authenticated user to downvote a recipes
```sh
  GET: /api/v1/recipes/downvote/<recipeId>
```
### An API route that allows a user to get just recipes with the most upvotes
  ```sh
     GET: /api/v1/recipes?sort=upvotes&order=desc
  ```

### More features to be added soon