import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import signup from './signupReducer';
import signin from './signinReducer';
import favorite from './favoriteReducer';
import review from './reviewReducer';
const rootReducer = combineReducers({
  recipes,
  signup,
  signin,
  favorite,
  review
});

export default rootReducer;
