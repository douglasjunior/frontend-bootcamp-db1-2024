import axios from 'axios';
import LocalStorageHelper from './helpers/localstorage-helper';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use((request) => {
  const token = LocalStorageHelper.getToken();
  if (token) {
    request.headers.authorization = `Bearer ${token}`;
  }
  return request;
});
