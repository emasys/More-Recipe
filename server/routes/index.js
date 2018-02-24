import express from 'express';
import Recipes from '../controllers/recipes';
import Users from '../controllers/users';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorite';
import middleware from '../middleware/authorization';

const router = express.Router();
// Recipe requests
router.get('/recipes', Recipes.listRecipes);
router.get('/recipes/user/:userId', middleware.verifyToken, middleware.checkParams, Recipes.listPrivateRecipes);
router.get('/favorites', middleware.verifyToken, Favorite.listFavorites);
router.get('/recipes/:recipeId', middleware.verifyToken, middleware.checkParams, Recipes.getRecipe);
router.get('/recipes/reaction/:recipeId', middleware.verifyToken, middleware.checkParams, Recipes.getReactionCount);
router.get('/reviews/:recipeId', middleware.verifyToken, middleware.checkParams, Reviews.getReviews);
router.delete('/reviews/delete/:reviewId', middleware.verifyToken, middleware.checkParams, Reviews.deleteReviews);
router.delete('/recipes/:recipeId', middleware.verifyToken, middleware.checkParams, Recipes.deleteRecipe);

// POST recipe requests
router.post('/recipes', middleware.verifyToken, Recipes.addRecipe);
router.post('/recipes/upvote/:recipeId', middleware.verifyToken, middleware.checkParams, Recipes.upvote);
router.put('/recipes/:recipeId', middleware.verifyToken, middleware.checkParams, Recipes.updateRecipe);
router.post('/recipes/downvote/:recipeId', middleware.checkParams, middleware.verifyToken, Recipes.downvote);
router.post('/recipes/:recipeId/favorite', middleware.checkParams, middleware.verifyToken, Favorite.addFavorite);
router.post('/recipes/:recipeId/reviews', middleware.checkParams, middleware.verifyToken, Reviews.addReview);
router.post('/reset', Users.sendToken);
router.post('/completereset', Users.getToken);

// User requests
router.post('/users/signup', Users.signUp);
router.post('/users/signin', Users.signIn);
router.get('/users', middleware.checkAdmin, middleware.verifyToken, Users.getUsers);
router.get('/users/:userId', middleware.checkParams, Users.getOneUser);
router.put('/users/changepassword', Users.resetPassword);
router.put('/users/:userId', middleware.checkParams, middleware.verifyToken, Users.updateUser);
router.delete('/users/:userId', middleware.checkParams, middleware.verifyToken, middleware.checkAdmin, Users.deleteUser);

export default router;
