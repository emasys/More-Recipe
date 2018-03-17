import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';

/**
 * Upvote a recipe
 *
 * @param {number} id
 *
 * @returns {object} updated recipe
 */
export const upvote = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/recipes/upvote/${id}`, null)
    .then(response => {
      dispatch({ type: type.UPVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.UPVOTE, payload: err.response.data });
      dispatch(isLoading(false));
    });
};

/**
 * Downvote a recipe
 *
 * @param {number} id
 *
 * @returns {object} updated recipe
 */
export const downvote = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/recipes/downvote/${id}`, null)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response.data });
      dispatch(isLoading(false));
    });
};
