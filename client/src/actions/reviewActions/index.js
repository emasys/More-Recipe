import axios from 'axios';
import * as type from '../types';
import { isLoading, UTIL } from '../index';

// Fetch reviews for a recipe
export const getReviews = recipeId => dispatch =>
  axios
    .get(`${UTIL.baseUrl}/reviews/${recipeId}`, UTIL.config)
    .then(response => {
      dispatch({ type: type.GET_REVIEWS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });

// Post a review
export const postReview = (data, id) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${UTIL.baseUrl}/recipes/${id}/reviews`, data, UTIL.config)
    .then(response => {
      dispatch({ type: type.REVIEW, payload: response.data });
      dispatch(getReviews(id));
    })
    .catch(err => {
      dispatch({ type: type.REVIEW, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Delete a review
export const deleteReview = (reviewId, recipeId) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .delete(`${UTIL.baseUrl}/reviews/delete/${reviewId}`, UTIL.config)
    .then(response => {
      dispatch({ type: type.DELETE_REVIEWS, payload: response.data });
      dispatch(getReviews(recipeId));
    })
    .catch(err => {
      dispatch({ type: type.DELETE_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });
};
