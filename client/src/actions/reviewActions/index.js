import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

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
