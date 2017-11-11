import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import signup from './signupReducer.js';
const rootReducer = combineReducers({ recipes, signup });

export default rootReducer;
