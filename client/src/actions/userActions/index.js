import axios from 'axios';
import * as type from '../types';
import { isLoading } from '../index';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// Get a specific user
export const getUserInfo = id => dispatch => {
  dispatch(isLoading(true));
  return axios
    .get(`${URL}/users/${id}`)
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
  axios
    .get(`${URL}/recipes/user/${id}/${limit}/${offset}?token=${xtoken}`)
    .then(response => {
      dispatch({ type: type.USER_RECIPES, payload: response.data.recipes });
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
    .get(`${URL}/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_PROFILE, payload: response.data });
      // dispatch(isLoading(false));
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
    .get(`${URL}/users?token=${xtoken}`)
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
    .delete(`${URL}/users/${id}?token=${xtoken}`)
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
  console.log(id, data);
  dispatch(isLoading(true));
  return axios
    .put(`${URL}/users/${id}?token=${xtoken}`, data)
    .then(response => {
      console.log("====>response", response.data);
      dispatch({ type: type.UPDATE_USER, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.UPDATE_USER, payload: err.response });
      dispatch(isLoading(false));
    });
};
