import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
});

export async function getProductList(params = {}) {
  const res = await instance.get('/Products', {
    params,
  });
  return res.data;
}

export async function getProduct(id) {
  const res = await instance.get(`/Products/${id}`);
  return res.data;
}

export async function createProduct(params = {}) {
  const res = await instance.post('/Products', {
    name: params.name,
    description: params.description,
    tags: params.tags,
    price: params.price,
    images: params.images,
  });
  return res.data;
}

export async function patchProduct(id, productData) {
  const res = await instance.patch(`/Products/${id}`, productData);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await instance.delete(`/Products/${id}`);
  return res.data;
}