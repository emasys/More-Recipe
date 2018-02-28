import * as type from '../types';
import { isLoading } from '../index';
import instance from '../../config/axios';
import { getRecipeReactions } from '../recipeActions';

// Get user favorites
export const getFavorite = (limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/favorites?limit=${limit}&offset=${offset}`)
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
  return instance
    .post(`/recipes/${id}/favorite`, null)
    .then(response => {
      dispatch({ type: type.SET_FAVORITE, payload: response.data });
      dispatch(getRecipeReactions(id));
    })
    .catch(err => {
      dispatch({ type: type.SET_FAVORITE, payload: err.response });
      dispatch(isLoading(false));
    });
};

export const clearFavoriteList = () => dispatch => {
  dispatch({ type: type.CLEAR_RECIPES, payload: [] });
};
