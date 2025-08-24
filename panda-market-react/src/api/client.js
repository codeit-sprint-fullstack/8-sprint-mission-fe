import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://panda-market-api-qg1h.onrender.com',
  timeout: 5000,
});
