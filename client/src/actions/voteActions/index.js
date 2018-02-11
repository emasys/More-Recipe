import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');
const config = {
  headers: { 'x-access-token': xtoken }
};

// upvote
export const upvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/upvote/${id}`, null, config)
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
    .post(`${URL}/recipes/downvote/${id}`, null, config)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response });
      dispatch(isLoading(false));
    });
};
