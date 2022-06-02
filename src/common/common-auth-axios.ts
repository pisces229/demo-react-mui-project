import axios from 'axios';
interface Refresh {
  do: boolean;
  queue: (() => void)[];
  push: (callback: () => void) => void;
  run: () => void;
}
const refresh: Refresh = {
  do: false,
  queue: [],
  push: (callback: () => void) => {
    refresh.queue.push(callback);
  },
  run: () => {
    refresh.do = false;
    refresh.queue.forEach((callback) => callback());
    refresh.queue.length = 0;
  },
};
const BASE_URL = 'https://localhost:9100';
const CommonAuthAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
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
    // if (error.response.status === 401 && !originalConfig._retry) {
    //   originalConfig._retry = true;
    if (error.response.status === 401) {
      if (localStorage.getItem('token')) {
        if (!refresh.do) {
          refresh.do = true;
          doRefresh();
        }
        return new Promise((resolve, reject) => {
          refresh.push(() => {
            resolve(CommonAuthAxios(originalConfig));
          });
        });
      } else {
        console.log(error);
        return Promise.reject(error);
      }
    } else {
      console.log(error);
      return Promise.reject(error);
    }
  },
);
const doRefresh = () => {
  CommonAuthAxios.post(
    '/Refresh',
    JSON.stringify(localStorage.getItem('token')!),
  )
  .then((value) => localStorage.setItem('token', value.data))
  .catch((error) => localStorage.removeItem('token'))
  .finally(() => refresh.run());
};
export { CommonAuthAxios };
