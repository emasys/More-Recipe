import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';

/**
 * Fetch all the review of a recipe
 *
 * @param {number} recipeId
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested reviews
 */
export const getReviews = (recipeId, limit = 1, offset = 0) => dispatch =>
  instance
    .get(`/reviews/${recipeId}?limit=${limit}&offset=${offset}`)
    .then(response => {
      dispatch({ type: type.GET_REVIEWS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch({ type: type.GET_REVIEWS, payload: error.response.data });
      dispatch(isLoading(false));
    });

/**
 * Remove the list of review from the store
 *
 *
 * @returns {object} empty array
 */
export const clearReview = () => ({ type: type.CLEAR_REVIEW, payload: [] });

// Post a review
export const postReview = (data, id) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/recipes/${id}/reviews`, data)
    .then(response => {
      dispatch({ type: type.REVIEW, payload: response.data });
      dispatch(clearReview());
      dispatch(getReviews(id));
    })
    .catch(error => {
      dispatch({ type: type.REVIEW, payload: error.response.data });
      dispatch(isLoading(false));
    });
};

/**
 * Delete a recipe
 *
 * @param {number} reviewId
 * @param {number} recipeId
 *
 * @returns {object} list of remaining recipes
 */
export const deleteReview = (reviewId, recipeId) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .delete(`/reviews/delete/${reviewId}`)
    .then(response => {
      dispatch({ type: type.DELETE_REVIEWS, payload: response.data });
      dispatch(clearReview());
      dispatch(getReviews(recipeId, 1, 0));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch({ type: type.DELETE_REVIEWS, payload: error.response.data });
      dispatch(isLoading(false));
    });
};
