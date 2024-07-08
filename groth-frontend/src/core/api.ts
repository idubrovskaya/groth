import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: false,
});

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  withCredentials: false,
});
