import * as type from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
  case type.ALL_RECIPES:
    return {
      ...state,
      allRecipes: action.payload
    };
  case type.SINGLE_RECIPE:
    return {
      ...state,
      recipeItem: action.payload
    };
  case type.SINGLE_RECIPE_REACTION:
    return {
      ...state,
      recipeItem: action.payload
    };
  case type.USER_RECIPES:
    return {
      ...state,
      userRecipes: action.payload
    };
  case type.EDIT_RECIPE:
    return {
      ...state,
      updateRecipes: action.payload
    };
  case type.GET_CATEGORY:
    return {
      ...state,
      category: action.payload
    };

  case type.SEARCH:
    return {
      ...state,
      search: action.payload
    };

  case type.DELETE_RECIPE:
    return {
      ...state,
      del_recipe: action.payload
    };

  case type.NEW_RECIPE:
    return {
      ...state,
      new_recipe: action.payload
    };

  default:
    return state;
  }
};
