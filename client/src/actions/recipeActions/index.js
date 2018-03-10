import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';
import { getUserInfo, getUserRecipes } from '../userActions';
import { getReviews } from '../reviewActions';

/**
 * Fetch all the recipes in the database
 *
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested recipes
 */
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
/**
 * Remove the list of recipes from the store
 *
 * @returns {object} empty array
 */
export const clearRecipes = () => dispatch => {
  dispatch({ type: type.CLEAR_RECIPES, payload: [] });
};

/**
 * Fetch a single recipes from the database
 *
 * @param {number} id
 *
 * @returns {object} recipe detail
 */
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

/**
 * Fetch a single recipe with the most recent reactions
 * including upvotes, downvotes and favorite
 *
 * @param {number} id
 *
 * @returns {object} Recipe detail
 */
export const getRecipeReactions = id => dispatch =>
  instance
    .get(`/recipes/reaction/${id}`)
    .then(response => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: err.response });
      dispatch(isLoading(false));
    });

/**
 * Edit a recipe
 *
 * @param {object} data
 * @param {number} id
 *
 * @returns {object} Updated recipe
 */
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

/**
 * Delete a recipe
 *
 * @param {number} id
 * @param {number} userId
 *
 * @returns {object} list of recipes without the deleted one
 */
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

/**
 * Fetch all the recipes in the database
 * that matches the keyword
 *
 * @param {string} keyword
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested recipes
 */
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
/**
 * Add Recipe
 *
 * @param {object} data
 *
 * @returns {object} Recently added recipe
 */
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

/**
 * Fetch first 12 recipes with most views
 *
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested recipes
 */
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

/**
 * Fetch all the recipes in the database
 * that matches the category keyword
 *
 * @param {number} category
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested recipes
 */
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
