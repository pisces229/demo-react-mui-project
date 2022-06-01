import axios from 'axios';
const BASE_URL = 'https://localhost:9100';

const CommonAuthAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
CommonAuthAxios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      // Authorization: `Bearer ${localStorage.getItem('token')!}`,
      Token: `${localStorage.getItem('token')!}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
CommonAuthAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      if (!DoingRefresh()) {
        await RunRefresh();
      } else {
        let reTryCount = 0;
        while (DoingRefresh() && reTryCount < 8) {
          await WaitRefresh();
          ++reTryCount;
        }
      }
      if (localStorage.getItem('token')) {
        return CommonAuthAxios(originalConfig);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
// Refresh
const RunRefresh = async () => {
  try {
    localStorage.setItem('refresh', `${true}`);
    const refreshResponse = await CommonAuthAxios.post(
      '/Refresh',
      JSON.stringify(localStorage.getItem('token')!),
    );
    if (refreshResponse.status === 200) {
      console.log(refreshResponse.headers['content-type']);
      localStorage.setItem('token', refreshResponse.data);
    } else {
      localStorage.removeItem('token');
    }
  } finally {
    localStorage.removeItem('refresh');
  }
};
const DoingRefresh = () => localStorage.getItem('refresh');
const WaitRefresh = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(!!localStorage.getItem('refresh')), 500),
  );
export { CommonAuthAxios };
