import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('accessToken');

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    throw new Error(error);
  }
);

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  withCredentials: false,
});
