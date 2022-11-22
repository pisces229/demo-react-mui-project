import { DefaultService } from './default/index';
import axios from 'axios';
import CONFIG from '../config';
import { useAuthStore } from '../stores/auth';

// default
const defaultAxios = axios.create({
  baseURL: `${CONFIG.ENDPOINT}/api`,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
defaultAxios.interceptors.request.use(
  (config) => {
    // console.log(`request (config)`);
    return config;
  },
  async (error) => {
    // console.log(`request (error)`);
    return Promise.reject(error);
  },
);
defaultAxios.interceptors.response.use(
  (response) => {
    // console.log(`response (response)`);
    return response;
  },
  async (error) => {
    // console.log(`response (error)`);
    return Promise.reject(error);
  },
);
// Authenticate
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
const authenticateAxios = axios.create({
  baseURL: `${CONFIG.ENDPOINT}/api`,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
authenticateAxios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
authenticateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    // if (error.response.status === 401 && !originalConfig._retry) {
    //   originalConfig._retry = true;
    if (error.response.status === 401) {
      if (useAuthStore.getState().token) {
        if (!refresh.do) {
          refresh.do = true;
          doRefresh();
        }
        return new Promise((resolve, reject) => {
          refresh.push(() => {
            resolve(authenticateAxios(originalConfig));
          });
        });
      } else {
        console.log(error);
        return Promise.reject(error);
      }
    } else if (error.response.status === 403) {
      console.log(error);
      useAuthStore.setState({ token: '' });
      return Promise.reject(error);
    } else {
      console.log(error);
      return Promise.reject(error);
    }
  },
);
const doRefresh = () => {
  DefaultService.refresh(useAuthStore.getState().token)
    .then((response) => {
      if (response.data.success) {
        useAuthStore.setState({ token: response.data.data })
      } else {
        useAuthStore.setState({ token: '' });
      }
    })
    .catch((error) => {
      console.log(error);
      useAuthStore.setState({ token: '' });
    })
    .finally(() => refresh.run());
};
export { defaultAxios, authenticateAxios };
