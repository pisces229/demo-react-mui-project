import axios from 'axios';
import CONFIG from '../config';
import { useAuthStore } from '../stores/auth';

// Default
const DefaultAxios = axios.create({
  baseURL: CONFIG.ENDPOINT,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
DefaultAxios.interceptors.request.use(
  (config) => {
    // console.log(`request (config)`);
    return config;
  },
  async (error) => {
    // console.log(`request (error)`);
    return Promise.reject(error);
  },
);
DefaultAxios.interceptors.response.use(
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
const AuthenticateAxios = axios.create({
  baseURL: CONFIG.ENDPOINT,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
AuthenticateAxios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      // Authorization: `Bearer ${useAuthStore.getState().token}`,
      Token: `${useAuthStore.getState().token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
AuthenticateAxios.interceptors.response.use(
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
            resolve(AuthenticateAxios(originalConfig));
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
  AuthenticateAxios.post(
    '/refresh',
    JSON.stringify(useAuthStore.getState().token),
  )
    .then((value) => useAuthStore.setState({ token: value.data }))
    .catch((error) => useAuthStore.setState({ token: '' }))
    .finally(() => refresh.run());
};
export { DefaultAxios, AuthenticateAxios };
