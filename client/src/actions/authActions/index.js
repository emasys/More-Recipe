import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';

const URL = '/api/v1';

// Create a new user
export const signUp = data => dispatch => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/users/signup`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch(isLoading(false));
        return dispatch({ type: type.SIGN_UP, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_UP, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SIGN_UP, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Login
export const signIn = data => dispatch => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/users/signin`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch(isLoading(false));
        return dispatch({ type: type.SIGN_IN, payload: response.data });
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_IN, payload: response.data });
    })
    .catch(err => {
      dispatch(isLoading(false));
      dispatch({ type: type.SIGN_IN, payload: err.response });
    });
};

// reset password
export const resetPassword = data => dispatch => {
  dispatch(isLoading(true));
  return axios
    .put(`${URL}/users/resetPassword`, data)
    .then(response => {
      dispatch({ type: type.RESET_PASSWORD, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.RESET_PASSWORD, payload: err.response });
      dispatch(isLoading(false));
    });
};

// send reset password token
export const sendToken = data => dispatch =>
  axios
    .post(`${URL}/reset`, data)
    .then(response => {
      dispatch({ type: type.SEND_TOKEN, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.SEND_TOKEN, payload: err.response });
    });

// compare reset password token
export const compareToken = data => dispatch => {
  dispatch(isLoading(true));
  return axios
    .post(`${URL}/completeReset`, data)
    .then(response => {
      dispatch({ type: type.COMPARE_TOKEN, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.COMPARE_TOKEN, payload: err.response });
      dispatch(isLoading(false));
    });
};
