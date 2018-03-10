import * as type from '../types';
import instance from '../../config/axios';
import { isLoading } from '../index';

/**
 * Fetch user data of one user
 *
 * @param {number} id
 *
 * @returns {object} user data of one user
 */
export const getUserInfo = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_INFO, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_INFO, payload: err.response });
      dispatch(isLoading(false));
    });
};

/**
 * Fetch all the recipes of one user
 *
 * @param {number} id
 * @param {number} limit
 * @param {number} offset
 *
 * @returns {object} list of requested recipes
 */
export const getUserRecipes = (id, limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/recipes/user/${id}?limit=${limit}&offset=${offset}`)
    .then(response => {
      dispatch({ type: type.USER_RECIPES, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_RECIPES, payload: err.response });
      dispatch(isLoading(false));
    });
};

/**
 * Fetch user data of one user
 *
 * @param {number} id
 *
 * @returns {object} user data of one user
 */
export const getProfile = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/users/${id}`)
    .then(response => {
      dispatch({ type: type.USER_PROFILE, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.USER_PROFILE, payload: err.response });
      dispatch(isLoading(false));
    });
};

/**
 * Fetch user data of all users
 *
 * @returns {object} list of requested data
 */
export const getAllUsers = () => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`/users`)
    .then(response => {
      dispatch({ type: type.ALL_USERS, payload: response.data });
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch({ type: type.ALL_USERS, payload: err.response });
      dispatch(isLoading(false));
    });
};

/**
 * Delete a user
 *
 * @param {number} id
 *
 * @returns {object} confirmation status
 */
export const deleteUser = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .delete(`/users/${id}`)
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

/**
 * Update user data
 *
 * @param {number} id
 * @param {object} data
 *
 * @returns {object} updated user data
 */
export const updateUser = (id, data) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .put(`/users/${id}`, data)
    .then(response => {
      dispatch({ type: type.UPDATE_USER, payload: response.data });
      dispatch(isLoading(false));
      dispatch(getProfile(id));
    })
    .catch(err => {
      dispatch({ type: type.UPDATE_USER, payload: err.response });
      dispatch(isLoading(false));
    });
};
