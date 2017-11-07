require('babel-register');
require('babel-polyfill');
require('./index');


// app.route('/api/v1/users/signup')
//   .post(Users.signUp);
// app.route('/api/v1/users/signin')
//   .post(Users.signIn);
// app.route('/api/v1/recipes')
//   .get(Recipes.listRecipes)
//   .post(jwt.verifyToken, Recipes.addRecipe);
// app.route('/api/v1/recipes/upvote/:recipeId')
//   .post(jwt.verifyToken, Recipes.upvote);
// app.route('/api/v1/recipes/downvote/:recipeId')
//   .post(jwt.verifyToken, Recipes.downvote);
// app.route('/api/v1/recipes/:userId/fav')
//   .get(jwt.verifyToken, Favorite.listFavorites);
// app.route('/api/v1/recipes/:recipeId/fav')
//   .post(jwt.verifyToken, Favorite.addFavorite);
// app.route('/api/v1/recipes/:recipeId')
//   .put(jwt.verifyToken, Recipes.updateRecipe)
//   .delete(jwt.verifyToken, Recipes.deleteRecipe)
//   .get(jwt.verifyToken, Recipes.getRecipe);
// app.route('/api/v1/recipes/:recipeId/reviews')
//   .post(jwt.verifyToken, Reviews.addReview);
