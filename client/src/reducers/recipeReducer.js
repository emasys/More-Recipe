import * as type from '../actions/types';

export default (
  state = {
    allRecipes: [],
    recipeItem: {},
    updateRecipes: {},
    category: []
  },
  action
) => {
  switch (action.type) {
  case type.ALL_RECIPES:
    return {
      ...state,
      hotRecipes: action.payload.recipes,
      allRecipes: [...state.allRecipes, ...action.payload.recipes],
      count: action.payload.count,
      success: action.payload.success
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
      category: action.payload.recipes,
      count: action.payload.count,
    };

  case type.SEARCH:
    return {
      ...state,
      searchResult: action.payload.recipes,
      success: action.payload.success
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

  case type.UPLOAD_FOOD_IMG:
    return {
      ...state,
      uploadedImg: action.payload
    };

  default:
    return state;
  }
};
