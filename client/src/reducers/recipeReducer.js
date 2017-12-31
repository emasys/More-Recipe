import * as type from '../actions/types';

const initialState = {
  recipeItem: {
    recipe: {
      // category: '',
      // comments: null,
      // createdAt: '',
      // description: '',
      // direction: '',
      // downvote: null,
      // favorite: null,
      // favorites: [],
      // foodImg: '',
      // ingredients: [],
      // name: '',
      // reactionDown: [],
      // reactionUp: [],
      // reviews: [],
      // updatedAt: '',
      // upvote: null,
      // views: null
    }
  }
};
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
