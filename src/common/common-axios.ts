import axios from 'axios';
const BASE_URL = 'https://localhost:9100';
const CommonAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
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
