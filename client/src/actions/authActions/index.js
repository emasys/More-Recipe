import * as type from '../types';
import instance from '../../config/axios';
import { isLoading, isAuthenticated } from '../index';

/**
 * Create a new user
 *
 * @param {object} data
 *
 * @return {object} success status and jwt token
 */
export const signUp = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/users/signup`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch({ type: type.SIGN_UP, payload: response.data });
        dispatch(isLoading(false));
        return;
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_UP, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: type.SIGN_UP, payload: error.response.data });
      dispatch(isLoading(false));
    });
};

/**
 * Initiates a login process
 *
 * @param {object} data
 *
 * @return {object} success status and jwt token
 */
export const signIn = data => dispatch => {
  console.log("signed in");
  dispatch(isLoading(true));
  return instance
    .post(`/users/signin`, data)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      const jwtToken = window.localStorage.getItem('token');
      if (jwtToken.length > 9) {
        dispatch(isAuthenticated());
        dispatch({ type: type.SIGN_IN, payload: response.data });
        dispatch(isLoading(false));
        return;
      }
      window.localStorage.removeItem('token');
      dispatch({ type: type.SIGN_IN, payload: response.data });
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch({ type: type.SIGN_IN, payload: error.response });
    });
};

export const signOut = () => dispatch => {
  window.localStorage.removeItem('token');
  dispatch(isLoading(true));
  dispatch(isLoading(false));
  return dispatch({ type: type.SIGN_OUT, payload: {} });
};

/**
 * Reset password
 *
 * @param {object} data
 *
 * @returns {object} success status
 */
export const resetPassword = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .put(`/users/changepassword`, data)
    .then(response => {
      dispatch({ type: type.RESET_PASSWORD, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch({ type: type.RESET_PASSWORD, payload: error.response });
      dispatch(isLoading(false));
    });
};

/**
 * Send generated token to user
 *
 * @param {object} data
 *
 * @returns {object} success status
 *
 */
export const sendToken = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/reset`, data)
    .then(response => {
      dispatch({ type: type.SEND_TOKEN, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch({ type: type.SEND_TOKEN, payload: error.response });
      dispatch(isLoading(false));
    });
};

/**
 * compare password in the db with password in param
 *
 * @param {object} data
 *
 * @returns {object} success status
 */
export const compareToken = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`/completereset`, data)
    .then(response => {
      dispatch({ type: type.COMPARE_TOKEN, payload: response.data });
      dispatch(resetPassword(data));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch({ type: type.COMPARE_TOKEN, payload: error.response });
      dispatch(isLoading(false));
    });
};

export const clearAuthInfo = () => ({ type: type.CLEAR_AUTH, payload: [] });
