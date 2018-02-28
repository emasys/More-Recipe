import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as type from './types';
import config from '../config';
import { updateUser, getUserInfo } from './userActions';

export const isAuthenticated = () => {
  const jwtToken = window.localStorage.getItem('token');
  let isLoggedIn = true;
  let userId = null;
  let username = null;
  if (!jwtToken || !jwtToken.length > 9) {
    isLoggedIn = false;
  } else {
    const decoded = jwtDecode(jwtToken);
    userId = decoded.id;
    username = decoded.moniker;
  }
  return {
    type: type.IS_LOGGEDIN,
    payload: {
      isLoggedIn,
      userId,
      username
    }
  };
};

export const isLoading = bool => dispatch => {
  if (bool) {
    dispatch(isAuthenticated());
  }
  return dispatch({
    type: type.IS_LOADING,
    isLoading: bool
  });
};

export const flashMessage = path => ({
  type: type.FLASH_MESSAGE,
  message: 'You have to be logged in to view this content',
  path
});

// Upload recipe image
export const uploadImg = (data, id) => {
  const formData = new FormData();
  formData.append('file', data);
  formData.append('tags', `morerecipe`);
  formData.append('upload_preset', config.UPLOAD_PRESET);
  formData.append('api_key', config.API_KEY);
  formData.append('timestamp', (Date.now() / 1000) | 0);
  return dispatch =>
    axios
      .post(config.CLOUD_URL, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => {
        const responseData = response.data;
        const payload = responseData.secure_url;
        dispatch({ type: type.UPLOAD_FOOD_IMG, payload });
        dispatch(updateUser(id, { avatar: payload }));
        dispatch(getUserInfo(id));
      })
      .catch(err => {
        dispatch({
          type: type.UPLOAD_FOOD_IMG,
          payload: { success: false, payload: err.response }
        });
      });
};
