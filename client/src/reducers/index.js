import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import signup from './signupReducer';
import signin from './userReducer';
import favorite from './favoriteReducer';
import review from './reviewReducer';
import new_recipe from './addRecipe';
import favStatus from './getFavStatus';
import votes from './voteReducer';

const rootReducer = combineReducers({
  recipes,
  signup,
  signin,
  favorite,
  review,
  new_recipe,
  favStatus,
  votes
});

export default rootReducer;
