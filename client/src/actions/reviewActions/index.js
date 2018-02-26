import * as type from '../types';
import instance from '../../config/axios'
import { isLoading } from '../index';

// Fetch reviews for a recipe
export const getReviews = recipeId => dispatch =>
  instance
    .get(`/reviews/${recipeId}`)
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
  return instance
    .post(`/recipes/${id}/reviews`, data)
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
  return instance
    .delete(`/reviews/delete/${reviewId}`)
    .then(response => {
      dispatch({ type: type.DELETE_REVIEWS, payload: response.data });
      dispatch(getReviews(recipeId));
    })
    .catch(err => {
      dispatch({ type: type.DELETE_REVIEWS, payload: err.response });
      dispatch(isLoading(false));
    });
};
