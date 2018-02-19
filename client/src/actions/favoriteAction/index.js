import axios from 'axios';
import * as type from '../types';
import { isLoading, UTIL } from '../index';
import { getRecipeReactions } from '../recipeActions';

// Get user favorites
export const getFav = () => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${UTIL.baseUrl}/favorites`, UTIL.config)
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
  return axios
    .post(`${UTIL.baseUrl}/recipes/${id}/fav`, null, UTIL.config)
    .then(response => {
      dispatch({ type: type.SET_FAVORITE, payload: response.data });
      dispatch(getRecipeReactions(id));
    })
    .catch(err => {
      dispatch({ type: type.SET_FAVORITE, payload: err.response });
      dispatch(isLoading(false));
    });
};
