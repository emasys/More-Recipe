import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import moreRecipes from './controllers/recipes';

const recipes = new moreRecipes();

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

app.route('/api/recipes')
  .get(recipes.getRecipes)
  .post(recipes.postRecipes);
app.route('/api/recipes/:id')
  .put(recipes.updateRecipe)
  .delete(recipes.deleteRecipe);
app.route('/api/recipes/:id/reviews')
  .post(recipes.postReviews);


app.get('/*', (req, res) => {
  res.send('welcome to more recipes');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);

export default app;
