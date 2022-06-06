import axios from 'axios';
import CONFIG from '../config';
const CommonAxios = axios.create({
  baseURL: CONFIG.ENDPOINT,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
CommonAxios.interceptors.request.use(
  (config) => {
    // console.log(`request (config)`);
    return config;
  },
  async (error) => {
    // console.log(`request (error)`);
    return Promise.reject(error);
  },
);
CommonAxios.interceptors.response.use(
  (response) => {
    // console.log(`response (response)`);
    return response;
  },
  async (error) => {
    // console.log(`response (error)`);
    return Promise.reject(error);
  },
);

export { CommonAxios };
