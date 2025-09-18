import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_DEV_URL = import.meta.env.VITE_API_DEV_URL;
const TIMEOUT = 5000;

export const instance = axios.create({
  baseURL: VITE_API_DEV_URL,
  timeout: TIMEOUT,
});
