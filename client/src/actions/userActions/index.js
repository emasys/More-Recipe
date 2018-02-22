import axios from 'axios';
import * as type from '../types';
import { isLoading, UTIL } from '../index';

// Get a specific user
export const getUserInfo = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${UTIL.baseUrl}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_INFO, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_INFO, payload: err.response });
      dispatch(isLoading(false));
    });
};

// Get user specific recipes
export const getUserRecipes = (id, limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${UTIL.baseUrl}/recipes/user/${id}?limit=${limit}&offset=${offset}`, UTIL.config)
    .then(response => {
      console.log("recipes======>", response.data);
      dispatch({ type: type.USER_RECIPES, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_RECIPES, payload: err.response });
      dispatch(isLoading(false));
    });
};

// user profile
export const getProfile = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${UTIL.baseUrl}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_PROFILE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_PROFILE, payload: err.response });
      dispatch(isLoading(false));
    });
};

// fetch all users
export const getAllUsers = () => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${UTIL.baseUrl}/users`, UTIL.config)
    .then(response => {
      dispatch({ type: type.ALL_USERS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.ALL_USERS, payload: err.response });
      dispatch(isLoading(false));
    });
};

export const deleteUser = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .delete(`${UTIL.baseUrl}/users/${id}`, UTIL.config)
    .then(response => {
      dispatch({ type: type.DELETE_USER, payload: response.data });
      dispatch(getAllUsers());
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.DELETE_USER, payload: err.response });
      dispatch(isLoading(false));
    });
};

// update users
export const updateUser = (id, data) => dispatch => {
  dispatch(isLoading(true));
  return axios
    .put(`${UTIL.baseUrl}/users/${id}`, data, UTIL.config)
    .then(response => {
      dispatch({ type: type.UPDATE_USER, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.UPDATE_USER, payload: err.response });
      dispatch(isLoading(false));
    });
};
