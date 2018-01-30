import axios from 'axios';
import * as type from './types';
import config from '../config';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// Network request status
export const isLoading = bool => ({
  type: type.IS_LOADING,
  isLoading: bool
});
// Get a specific user
export const getUserInfo = id => dispatch =>
  axios
    .get(`${URL}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_INFO, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.USER_INFO, payload: err.response });
    });
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

export const clearRecipes = () => dispatch => {
  dispatch({ type: type.CLEAR_RECIPES, payload: [] });
};

// Fetch reviews for a recipe
export const getReviews = recipeId => dispatch =>
  axios
    .get(`${URL}/reviews/${recipeId}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_REVIEWS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });
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

// Get user specific recipes
export const getUserRecipes = (id, limit, offset) => dispatch => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/recipes/user/${id}/${limit}/${offset}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.USER_RECIPES, payload: response.data.recipes });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_RECIPES, payload: err.response });
      dispatch(isLoading(false));
    });
};

// user profile
export const getProfile = id => dispatch =>
  axios
    .get(`${URL}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_PROFILE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.USER_PROFILE, payload: err.response });
    });

// fetch all users
export const getAllUsers = () => dispatch =>
  axios
    .get(`${URL}/users?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.ALL_USERS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.ALL_USERS, payload: err.response });
    });

export const deleteUser = id => dispatch =>
  axios
    .delete(`${URL}/users/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DELETE_USER, payload: response.data });
      dispatch(getAllUsers());
    })
    .catch(err => {
      dispatch({ type: type.DELETE_USER, payload: err.response });
    });

// update users
export const updateUser = (id, data) => dispatch =>
  axios
    .put(`${URL}/users/${id}?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.UPDATE_USER, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.UPDATE_USER, payload: err.response });
    });

// Get user favorites
export const getFavs = () => dispatch =>
  axios
    .get(`${URL}/favorites?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_FAVORITES, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_FAVORITES, payload: err.response });
    });

// Get recipe category
export const getCategory = (data, limit, offset) => dispatch =>
  axios
    .post(`${URL}/recipes/category?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.GET_CATEGORY, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.GET_CATEGORY, payload: err.response });
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

// Create a new user
export const signUp = data => dispatch => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/users/signup`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch(isLoading(false));
        return dispatch({ type: type.SIGN_UP, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_UP, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SIGN_UP, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Login
export const signIn = data => dispatch => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/users/signin`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch(isLoading(false));
        return dispatch({ type: type.SIGN_IN, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_IN, payload: response.data });
    })
    .catch(err => {
      dispatch(isLoading(false));
      dispatch({ type: type.SIGN_IN, payload: err.response });
    });
};
// Post a review
export const postReview = (data, id) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/${id}/reviews?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.REVIEW, payload: response.data });
      dispatch(getReviews(id));
    })
    .catch(err => {
      dispatch({ type: type.REVIEW, payload: err.response });
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
export const addRecipe = data => dispatch =>
  axios
    .post(`${URL}/recipes?token=${xtoken}`, data)
    .then(response => {
      dispatch({ type: type.NEW_RECIPE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.NEW_RECIPE, payload: err.response });
    });

// Add Favorite
export const setFavorite = id => dispatch => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/recipes/${id}/fav?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.SET_FAVORITE, payload: response.data });
      dispatch(getRecipeReactions(id));
    })
    .catch(err => {
      dispatch({ type: type.SET_FAVORITE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Delete Recipe
export const delRecipe = (id, userId) => dispatch => {
  console.log(userId);
  const x = userId;
  dispatch(isLoading(true));
  return axios
    .delete(`${URL}/recipes/${id}?token=${xtoken}`)
    .then(response => {
      console.log(userId, x);
      dispatch({ type: type.DELETE_RECIPE, payload: response.data });
      dispatch(getUserRecipes(userId, 6, 0));
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DELETE_RECIPE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// upvote
export const upvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/upvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.UPVOTE, payload: response.data });
      dispatch(isLoading(false));
      // dispatch(getRecipeReactions(id));
    })
    .catch(err => {
      dispatch({ type: type.UPVOTE, payload: err.response });
      dispatch(getRecipeReactions(id));
    });
};

// downvote
export const downvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/downvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// reset password
export const resetPassword = data => dispatch =>
  axios
    .put(`${URL}/users/resetPassword`, data)
    .then(response => {
      dispatch({ type: type.RESET_PASSWORD, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.RESET_PASSWORD, payload: err.response });
    });

// send reset password token
export const sendToken = data => dispatch =>
  axios
    .post(`${URL}/reset`, data)
    .then(response => {
      dispatch({ type: type.SEND_TOKEN, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SEND_TOKEN, payload: err.response });
    });

// compare reset password token
export const compareToken = data => dispatch =>
  axios
    .post(`${URL}/completeReset`, data)
    .then(response => {
      dispatch({ type: type.COMPARE_TOKEN, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.COMPARE_TOKEN, payload: err.response });
    });

// Upload recipe image
export const uploadImg = data => {
  const formData = new FormData();
  formData.append('file', data);
  formData.append('tags', `morerecipe`);
  formData.append('upload_preset', config.UPLOAD_PRESET);
  formData.append('api_key', config.API_KEY);
  formData.append('timestamp', (Date.now() / 1000) | 0);

  return dispatch =>
    axios
      .post(config.CLOUD_URL, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => {
        const resdata = response.data;
        const payload = resdata.secure_url;
        dispatch({ type: type.UPLOAD_FOOD_IMG, payload });
      })
      .catch(err => {
        dispatch({
          type: type.UPLOAD_FOOD_IMG,
          payload: { success: false, payload: err.response }
        });
      });
};
