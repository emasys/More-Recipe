import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import moreRecipes from './controllers/recipes';

const recipes = new moreRecipes();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.route('/api/recipes')
  .get(recipes.getRecipes)
  .post(recipes.postRecipes);
app.route('/api/recipes/:id')
  .put(recipes.updateRecipe)
  .delete(recipes.deleteRecipe);
app.route('/api/recipes/:id/reviews')
  .post(recipes.postReviews);
app.route('/api/recipe?sort=upvotes&order=des')
  .get(recipes.getRecipes);

app.get('/*', (req, res) => {
  res.send('welcome to more recipes');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);

export default app;
