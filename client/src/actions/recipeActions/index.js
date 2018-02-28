import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';
import { getUserInfo, getUserRecipes } from '../userActions';
import { getReviews } from '../reviewActions';

// Fetch All recipes
export const getRecipes = (limit, offset = 0) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes?limit=${limit}&offset=${offset}`)
    .then(response => {
      dispatch({ type: type.ALL_RECIPES, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.ALL_RECIPES, payload: err.response });
      dispatch(isLoading(false));
    });
};

export const clearRecipes = () => dispatch => {
  dispatch({ type: type.CLEAR_RECIPES, payload: [] });
};

// Get a single recipe
export const getRecipeItem = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes/${id}`)
    .then(response => {
      dispatch({ type: type.SINGLE_RECIPE, payload: response.data });
      dispatch(getUserInfo(response.data.recipe.userId));
      dispatch(getReviews(id));
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.SINGLE_RECIPE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Get a single recipe reactions
export const getRecipeReactions = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes/reaction/${id}`)
    .then(response => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: err.response });
      dispatch(isLoading(false));
    });
};

// edit recipe
export const editRecipe = (data, id) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .put(`/recipes/${id}`, data)
    .then(response => {
      dispatch({ type: type.EDIT_RECIPE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.EDIT_RECIPE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Delete Recipe
export const delRecipe = (id, userId) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .delete(`/recipes/${id}`)
    .then(response => {
      dispatch({ type: type.DELETE_RECIPE, payload: response.data });
      dispatch(getUserRecipes(userId, 6, 0));
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DELETE_RECIPE, payload: err.response });
      dispatch(isLoading(false));
    });
};

export const searchRecipes = (keyword, limit = 1, offset = 0) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes?limit=${limit}&offset=${offset}&search=${keyword}`)
    .then(response => {
      dispatch({ type: type.SEARCH, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.SEARCH, payload: err.response });
      dispatch(isLoading(false));
    });
};

export const resetSearch = () => dispatch => {
  dispatch({ type: type.RESET_SEARCH, payload: [] });
};
// Add a recipe
export const addRecipe = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/recipes`, data)
    .then(response => {
      dispatch({ type: type.NEW_RECIPE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.NEW_RECIPE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Fetch All recipes
export const getHotRecipes = (limit, offset = 0) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes?limit=${limit}&offset=${offset}`)
    .then(response => {
      dispatch({ type: type.HOT_RECIPES, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.HOT_RECIPES, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Get recipe category
export const getCategory = (category, limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes?limit=${limit}&offset=${offset}&category=${category}`)
    .then(response => {
      dispatch({ type: type.GET_CATEGORY, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_CATEGORY, payload: err.response });
      dispatch(isLoading(false));
    });
};
