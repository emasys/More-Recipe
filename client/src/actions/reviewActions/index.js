import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';

// Fetch reviews for a recipe
export const getReviews = (recipeId, limit = 1, offset = 0) => dispatch =>
  instance
    .get(`/reviews/${recipeId}?limit=${limit}&offset=${offset}`)
    .then(response => {
      dispatch({ type: type.GET_REVIEWS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.GET_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });

export const clearReview = () => dispatch =>
  dispatch({ type: type.CLEAR_REVIEW, payload: [] });

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
    .catch(err => {
      dispatch({ type: type.REVIEW, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Delete a review
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
    .catch(err => {
      dispatch({ type: type.DELETE_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });
};
