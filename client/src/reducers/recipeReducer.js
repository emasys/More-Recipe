import * as type from '../actions/types';

export default (
  state = {
    allRecipes: [],
    recipeItem: {},
    updateRecipes: {},
    category: [],
    userRecipes: [],
    searchResult: []
  },
  action
) => {
  switch (action.type) {
  case type.CLEAR_RECIPES:
    return {
      ...state,
      allRecipes: [],
      userRecipes: action.payload
    };
  case type.ALL_RECIPES:
    return {
      ...state,
      allRecipes: [...state.allRecipes, ...action.payload.recipes],
      count: action.payload.count,
      success: action.payload.success
    };
  case type.HOT_RECIPES:
    return {
      ...state,
      hotRecipes: action.payload.recipes
    };
  case type.SET_FAVORITE:
    return {
      ...state,
      recipeItem: action.payload
    };
  case type.SINGLE_RECIPE:
  case type.UPVOTE:
  case type.DOWNVOTE:
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
      userRecipes: [...state.userRecipes, ...action.payload]
    };
  case type.EDIT_RECIPE:
    return {
      ...state,
      recipeItem: action.payload,
      updated: action.payload.success
    };
  case type.GET_CATEGORY:
    return {
      ...state,
      category: [...state.category, ...action.payload.recipes],
      count: action.payload.count
    };

  case type.SEARCH:
    return {
      ...state,
      searchResult: [...state.searchResult, ...action.payload.recipes],
      success: action.payload.success,
      searchCount: action.payload.count
    };

  case type.RESET_SEARCH:
    return {
      ...state,
      searchResult: action.payload
    };

  case type.DELETE_RECIPE:
    return {
      ...state,
      userRecipes: [],
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
