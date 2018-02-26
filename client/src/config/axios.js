import axios from 'axios';
// import store from '../store';

const instance = axios.create({
  baseURL: '/api/v1'
});
instance.interceptors.request.use(config => {
  config.headers['more-recipe-access'] = localStorage.getItem('token');
  return config;
});
export default instance;
