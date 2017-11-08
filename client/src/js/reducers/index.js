import {combineReducers} from 'redux';
import recipesReducer from './recipeReducer';
const rootReducer = combineReducers({recipe : recipesReducer});

export default rootReducer;