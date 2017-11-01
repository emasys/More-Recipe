import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Recipes from './controllers/recipes';
import Users from './controllers/users';
import Reviews from './controllers/reviews';
import Favorite from './controllers/favorite';
import jwt from './middleware/jwt';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
  next();
});

app.route('/api/v1/users/signup')
  .post(Users.signUp);
app.route('/api/v1/users/signin')
  .post(Users.signIn);
app.route('/api/v1/recipes')
  .get(Recipes.listRecipes)
  .post(jwt.verifyToken, Recipes.addRecipe);
app.route('/api/recipes/upvote/:recipeId')
  .post(jwt.verifyToken, Recipes.upvote);
app.route('/api/recipes/downvote/:recipeId')
  .post(jwt.verifyToken, Recipes.downvote);
app.route('/api/v1/fav/recipes/:userId')
  .get(jwt.verifyToken, Favorite.listFavorites);
app.route('/api/v1/fav/recipes')
  .post(jwt.verifyToken, Favorite.addFavorite);
app.route('/api/v1/recipes/:recipeId')
  .put(jwt.verifyToken, Recipes.updateRecipe)
  .delete(jwt.verifyToken, Recipes.deleteRecipe)
  .get(jwt.verifyToken, Recipes.getRecipe);
app.route('/api/v1/recipes/:recipeId/reviews')
  .post(jwt.verifyToken, Reviews.addReview);


app.use('*', (req, res) => {
  res.status(404).send({
    error: 'page not found'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app runnig on port ${PORT}`);  
});


export default app;
