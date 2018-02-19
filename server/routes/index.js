import express from 'express';
import Recipes from '../controllers/recipes';
import Users from '../controllers/users';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorite';
import jwt from '../middleware/authorization';

const router = express.Router();
// Recipe requests
router.get('/recipes/:page/:offset', Recipes.listRecipes);
router.get('/recipes/user/:id/:limit/:offset', jwt.verifyToken, Recipes.listPrivateRecipes);
router.get('/favorites', jwt.verifyToken, Favorite.listFavorites);
router.get('/recipe/:recipeId', jwt.verifyToken, Recipes.getRecipe);
router.get('/recipe/reaction/:recipeId', jwt.verifyToken, Recipes.getReactionCount);
router.get('/reviews/:recipeId', jwt.verifyToken, Reviews.getReviews);
router.delete('/reviews/delete/:reviewId', jwt.verifyToken, Reviews.deleteReviews);
router.delete('/recipes/:recipeId', jwt.verifyToken, Recipes.deleteRecipe);

// POST recipe requests
router.post('/recipes', jwt.verifyToken, Recipes.addRecipe);
router.post('/recipes/category/:limit/:offset', Recipes.listRecipeCategory);
router.post('/recipes/upvote/:recipeId', jwt.verifyToken, Recipes.upvote);
router.put('/recipes/:recipeId', jwt.verifyToken, Recipes.updateRecipe);
router.post('/recipes/downvote/:recipeId', jwt.verifyToken, Recipes.downvote);
router.post('/recipes/:recipeId/fav', jwt.verifyToken, Favorite.addFavorite);
router.post('/recipes/search/:limit/:offset', Recipes.SearchRecipe);
router.post('/recipes/:recipeId/reviews', jwt.verifyToken, Reviews.addReview);
router.post('/reset', Users.sendToken);
router.post('/completereset', Users.getToken);

// User requests
router.post('/users/signup', Users.signUp);
router.post('/users/signin', Users.signIn);
router.get('/users', jwt.checkAdmin, jwt.verifyToken, Users.getUsers);
router.get('/users/:userId', Users.getOneUser);
router.put('/users/changepassword', Users.resetPassword);
router.put('/users/:userId', jwt.verifyToken, Users.updateUser);
router.delete('/users/:userId', jwt.verifyToken, jwt.checkAdmin, Users.deleteUser);

export default router;
