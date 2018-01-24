import axios from 'axios';
import * as type from './types';
import config from '../config';

const URL = '/api/v1';

// Fetch All recipes
const getRecipes = (page, offset = 0, query = '') => dispatch => {
  axios
    .get(`${URL}/recipes/${page}/${offset}${query}`)
    .then(response => {
      dispatch({ type: type.ALL_RECIPES, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: type.ALL_RECIPES, payload: err.response });
    });
};

export default getRecipes;