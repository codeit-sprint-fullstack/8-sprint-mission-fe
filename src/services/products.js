import api from './api'

export const getProducts = async (params = {}) =>
  (await api.get('/products', { params })).data

export const getProduct = async (id) =>
  (await api.get(`/products/${id}`)).data

export const createProduct = async (payload) =>
  (await api.post('/products', payload)).data

export const updateProduct = async (id, payload) =>
  (await api.patch(`/products/${id}`, payload)).data

export const deleteProduct = async (id) =>
  (await api.delete(`/products/${id}`)).data