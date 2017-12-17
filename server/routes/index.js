import express from 'express';
import Recipes from '../controllers/recipes';
import Users from '../controllers/users';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorite';
import jwt from '../middleware/authorization';

const router = express.Router();
// GET recipe requests
router.get('/recipes/:page', Recipes.listRecipes);
router.get('/recipes/upvoteReaction/:recipeId', jwt.verifyToken, Recipes.checkReactions);
router.get('/recipes/yours/:limit/:id', jwt.verifyToken, Recipes.listPrivateRecipes);
router.get('/recipes/user/fav', jwt.verifyToken, Favorite.listFavorites);
router.get('/recipes/:recipeId/favStatus', jwt.verifyToken, Favorite.favoriteStatus);
router.get('/recipe/:recipeId', jwt.verifyToken, Recipes.getRecipe);

// POST recipe requests
router.post('/recipes', jwt.verifyToken, Recipes.addRecipe);
router.post('/recipes/category/:limit', Recipes.listRecipeCategory);
router.post('/recipes/upvote/:recipeId', jwt.verifyToken, Recipes.upvote);
router.put('/recipes/:recipeId', jwt.verifyToken, Recipes.updateRecipe);
router.post('/recipes/downvote/:recipeId', jwt.verifyToken, Recipes.downvote);
router.post('/recipes/:recipeId/fav', jwt.verifyToken, Favorite.addFavorite);
router.post('/recipeSearch', Recipes.SearchRecipe);
router.post('/recipes/:recipeId/reviews', jwt.verifyToken, Reviews.addReview);

router.post('/users/signup', Users.signUp);
router.post('/users/signin', Users.signIn);

router.get('/users', jwt.checkAdmin, jwt.verifyToken, Users.getUsers);
router.get('/users/:userId', Users.getOneUser);

router.put('/users/:userId', jwt.verifyToken, Users.updateUser);
router.delete('/users/:userId', jwt.verifyToken, jwt.checkAdmin, Users.deleteUser);
router.delete('/recipes/:recipeId', jwt.verifyToken, Recipes.deleteRecipe);

export default router;
