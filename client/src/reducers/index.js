import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import signup from './signupReducer';
import signin from './signinReducer';
const rootReducer = combineReducers({ recipes, signup, signin });

export default rootReducer;
