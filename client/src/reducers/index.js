import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import signup from './signupReducer';
import signin from './signinReducer';
import favorite from './favoriteReducer';
import review from './reviewReducer';
import new_recipe from './addRecipe';
const rootReducer = combineReducers({
  recipes,
  signup,
  signin,
  favorite,
  review,
  new_recipe
});

export default rootReducer;
