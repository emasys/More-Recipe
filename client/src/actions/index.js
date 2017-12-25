import axios from 'axios';
import * as type from './types';

const URL = '/api/v1';
const xtoken = localStorage.getItem('token');

// Fetch All recipes
export const getRecipes = (page, query = '') => dispatch => {
  axios
    .get(`${URL}/recipes/${page}${query}`)
    .then(response => {
      dispatch({ type: type.ALL_RECIPES, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.ALL_RECIPES, payload: err.response.data });
    });
};

// Get a single recipe
export const getRecipeItem = id => dispatch =>
  axios
    .get(`${URL}/recipe/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.SINGLE_RECIPE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SINGLE_RECIPE, payload: err.response.data });
    });

// Get user specific recipes
export const getUserRecipes = (limit, id) => dispatch =>
  axios
    .get(`${URL}/recipes/yours/${limit}/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.USER_RECIPES, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.USER_RECIPES, payload: err.response.data });
    });

// Get a specific user
export const getUserInfo = id => dispatch =>
  axios
    .get(`${URL}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_INFO, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.USER_INFO, payload: err.response.data });
    });

// user profile
export const getProfile = id => dispatch =>
  axios
    .get(`${URL}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_PROFILE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.USER_PROFILE, payload: err.response.data });
    });

export const deleteUser = id => dispatch =>
  axios
    .delete(`${URL}/users/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DELETE_USER, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.DELETE_USER, payload: err.response.data });
    });

// fetch all users
export const getAllUsers = () => dispatch =>
  axios
    .get(`${URL}/users?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.ALL_USERS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.ALL_USERS, payload: err.response.data });
    });

// update users
export const updateUser = (id, data) => dispatch =>
  axios
    .put(`${URL}/users/${id}?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.UPDATE_USER, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.UPDATE_USER, payload: err.response.data });
    });

// Get user favorites
export const getFavs = () => dispatch =>
  axios
    .get(`${URL}/recipes/user/fav?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_FAVORITES, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_FAVORITES, payload: err.response.data });
    });

// Get recipe category
export const getCategory = (data, limit) => dispatch =>
  axios
    .post(`${URL}/recipes/category/${limit}?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.GET_CATEGORY, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_CATEGORY, payload: err.response.data });
    });

// edit recipe
export const editRecipe = (data, id) => dispatch =>
  axios
    .put(`${URL}/recipes/${id}?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.EDIT_RECIPE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.EDIT_RECIPE, payload: err.response.data });
    });

// Create a new user
export const signUp = data => dispatch =>
  axios
    .post(`${URL}/users/signup`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      const jwtbug = window.localStorage.getItem('token');
      if (jwtbug.length > 9) {
        return dispatch({ type: type.SIGN_UP, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_UP, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SIGN_UP, payload: err.response.data });
    });

// Login
export const signIn = data => dispatch =>
  axios
    .post(`${URL}/users/signin`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtbug = window.localStorage.getItem('token');
      if (jwtbug.length > 9) {
        return dispatch({ type: type.SIGN_IN, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_IN, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SIGN_IN, payload: err.response.data });
    });

// Post a review
export const postReview = (data, id) => dispatch =>
  axios
    .post(`${URL}/recipes/${id}/reviews?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.REVIEW, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.REVIEW, payload: err.response.data });
    });

export const searchRecipes = data => dispatch => {
  axios
    .post(`${URL}/recipeSearch`, data)
    .then(response => {
      dispatch({ type: type.SEARCH, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SEARCH, payload: err.response.data });
    });
};

// Add a recipe
export const addRecipe = data => dispatch =>
  axios
    .post(`${URL}/recipes?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.NEW_RECIPE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.NEW_RECIPE, payload: err.response.data });
    });

// Add Favorite
export const setFavorite = id => dispatch =>
  axios
    .post(`${URL}/recipes/${id}/fav?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.SET_FAVORITE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SET_FAVORITE, payload: err.response.data });
    });

// Delete Recipe
export const delRecipe = id => dispatch =>
  axios
    .delete(`${URL}/recipes/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DELETE_RECIPE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.DELETE_RECIPE, payload: err.response.data });
    });

// upvote
export const upvote = id => dispatch =>
  axios
    .post(`${URL}/recipes/upvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.UPVOTE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.UPVOTE, payload: err.response.data });
    });

// downvote
export const downvote = id => dispatch =>
  axios
    .post(`${URL}/recipes/downvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response.data });
    });

// GET reaction status of a user
export const getUpvStatus = id => dispatch =>
  axios
    .get(`${URL}/recipes/upvoteReaction/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_VOTE_STATUS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_VOTE_STATUS, payload: err.response.data });
    });

// GET favorite status of a user
export const getFavStatus = id => dispatch =>
  axios
    .get(`${URL}/recipes/${id}/favStatus?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_FAVORITE_STATUS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_FAVORITE_STATUS, payload: err.response.data });
    });
