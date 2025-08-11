import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

export async function getProductList(params = {}) {
  const res = await instance.get('/products', { params });
  return res.data.list;
}

export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(params = {}) {
  const res = await instance.post('/products', {
    name: params.name,
    description: params.description,
    tags: params.tags,
    price: params.price,
    images: params.images,
  });
  return res.data;
}

export async function patchProduct(id, productData) {
  const res = await instance.patch(`/products/${id}`, productData);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await instance.delete(`/products/${id}`);
  return res.data;
}