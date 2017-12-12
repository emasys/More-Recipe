import Recipes from '../controllers/recipes';
import Users from '../controllers/users';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorite';
import jwt from '../middleware/authorization';

// routes
export default (routes) => {

/**
 * @swagger
 * /api/v1/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     description: Returns all recipes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of recipes
 *         schema:
 *           $ref: '#/definitions/recipes'
 */
routes.get('/api/v1/recipes/page/:page', Recipes.listRecipes);
// POST requests
routes.post('/api/v1/recipes', jwt.verifyToken, Recipes.addRecipe);



  routes.post('/api/v1/users/signup', Users.signUp);
  routes.post('/api/v1/users/signin', Users.signIn);


  routes.post('/api/v1/recipes/category/:limit', Recipes.listRecipeCategory);
  routes.post('/api/v1/recipes/upvote/:recipeId', jwt.verifyToken, Recipes.upvote);
  routes.post('/api/v1/recipes/:recipeId', jwt.verifyToken, Recipes.updateRecipe);
  routes.post('/api/v1/recipes/downvote/:recipeId', jwt.verifyToken, Recipes.downvote);
  routes.post('/api/v1/recipes/:recipeId/fav', jwt.verifyToken, Favorite.addFavorite);
  routes.post('/api/v1/recipeSearch', Recipes.SearchRecipe);
  routes.post('/api/v1/recipes/:recipeId/reviews', jwt.verifyToken, Reviews.addReview);

  routes.get('/api/v1/recipes/upvoteReaction/:recipeId', jwt.verifyToken, Recipes.checkReactions);
  routes.get('/api/v1/recipes/yours/:limit/:id', jwt.verifyToken, Recipes.listPrivateRecipes);
  routes.get('/api/v1/recipes/fav', jwt.verifyToken, Favorite.listFavorites);
  
  routes.get('/api/v1/recipes/:recipeId/favStatus', jwt.verifyToken, Favorite.favoriteStatus);
  routes.get('/api/v1/users', jwt.checkAdmin, jwt.verifyToken, Users.getUsers);
  routes.get('/api/v1/users/:userId', Users.getOneUser);
  routes.get('/api/v1/recipes/:recipeId', jwt.verifyToken, Recipes.getRecipe);

  routes.put('/api/v1/users/:userId', jwt.verifyToken, jwt.checkAdmin, Users.updateUser);
  routes.delete('/api/v1/users/:userId', jwt.verifyToken, jwt.checkAdmin, Users.deleteUser);
  routes.delete('/api/v1/recipes/:recipeId', jwt.verifyToken, Recipes.deleteRecipe);
};
