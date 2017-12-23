import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import user from './userReducer';
import favorite from './favoriteReducer';
import review from './reviewReducer';
import votes from './voteReducer';

const rootReducer = combineReducers({
  recipes,
  user,
  favorite,
  review,
  votes
});

export default rootReducer;
