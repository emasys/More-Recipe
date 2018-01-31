import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';
import { getUserInfo, getUserRecipes } from '../userActions';
import { getReviews } from '../reviewActions';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// Fetch All recipes
export const getRecipes = (page, offset = 0, query = '') => dispatch => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/recipes/${page}/${offset}${query}`)
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
  return axios
    .get(`${URL}/recipe/${id}?token=${xtoken}`)
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
export const getRecipeReactions = id => dispatch =>
  axios
    .get(`${URL}/recipe/reaction/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.SINGLE_RECIPE_REACTION, payload: err.response });
    });

// edit recipe
export const editRecipe = (data, id) => dispatch => {
  dispatch(isLoading(true));
  axios
    .put(`${URL}/recipes/${id}?token=${xtoken}`, data)
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
  const x = userId;
  dispatch(isLoading(true));
  return axios
    .delete(`${URL}/recipes/${id}?token=${xtoken}`)
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

export const searchRecipes = data => dispatch => {
  axios
    .post(`${URL}/recipeSearch`, data)
    .then(response => {
      dispatch({ type: type.SEARCH, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SEARCH, payload: err.response });
    });
};

// Add a recipe
export const addRecipe = data => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes?token=${xtoken}`, data)
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
export const getHotRecipes = (limit, offset = 0, query = '') => dispatch => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/recipes/${limit}/${offset}${query}`)
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
export const getCategory = (data, limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/category?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.GET_CATEGORY, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_CATEGORY, payload: err.response });
      dispatch(isLoading(false));
    });
};
