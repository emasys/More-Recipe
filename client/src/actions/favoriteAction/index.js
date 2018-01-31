import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';
import { getRecipeReactions } from '../recipeActions';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// Get user favorites
export const getFavs = () => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${URL}/favorites?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.GET_FAVORITES, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_FAVORITES, payload: err.response });
      dispatch(isLoading(false));
    });
};

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
