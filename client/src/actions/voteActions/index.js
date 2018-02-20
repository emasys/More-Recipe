import axios from 'axios';
import * as type from '../types';
import { isLoading, UTIL } from '../index';

// upvote
export const upvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${UTIL.baseUrl}/recipes/upvote/${id}`, null, UTIL.config)
    .then(response => {
      dispatch({ type: type.UPVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.UPVOTE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// downvote
export const downvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${UTIL.baseUrl}/recipes/downvote/${id}`, null, UTIL.config)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response });
      dispatch(isLoading(false));
    });
};
