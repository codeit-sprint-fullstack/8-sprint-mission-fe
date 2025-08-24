import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5173'
});

export const fetchItems = (params) => API.get('/items', { params });
export const fetchItem = (id) => API.get(`/items/${id}`);
export const createItem = (data) => API.post('/items', data);
export const updateItem = (id, data) => API.patch(`/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/items/${id}`);
