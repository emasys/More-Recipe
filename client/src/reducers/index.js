import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import user from './userReducer';
import favorite from './favoriteReducer';
import review from './reviewReducer';
import votes from './voteReducer';
import isLoading from './networkRequestReducer';

const rootReducer = combineReducers({
  recipes,
  user,
  favorite,
  review,
  votes,
  isLoading
});

export default rootReducer;
