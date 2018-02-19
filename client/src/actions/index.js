import axios from 'axios';
import * as type from './types';
import config from '../config';

// save token and base url
export const UTIL = {
  baseUrl: '/api/v1',
  config: {
    headers: { 'x-access-token': localStorage.getItem('token') }
  }
};

// Network request status
export const isLoading = bool => ({
  type: type.IS_LOADING,
  isLoading: bool
});

// Upload recipe image
export const uploadImg = data => {
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
      })
      .catch(err => {
        dispatch({
          type: type.UPLOAD_FOOD_IMG,
          payload: { success: false, payload: err.response }
        });
      });
};
