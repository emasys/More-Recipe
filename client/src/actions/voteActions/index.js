import axios from 'axios';
import * as type from '../types';
import config from '../../config';
import { isLoading } from '../index';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// upvote
export const upvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/upvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.UPVOTE, payload: response.data });
      dispatch(isLoading(false));
      // dispatch(getRecipeReactions(id));
    })
    .catch(err => {
      dispatch({ type: type.UPVOTE, payload: err.response });
      dispatch(getRecipeReactions(id));
    });
};

// downvote
export const downvote = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/recipes/downvote/${id}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.DOWNVOTE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DOWNVOTE, payload: err.response });
      dispatch(isLoading(false));
    });
};