import { instance } from './client.js';

export const getBestProducts = async () => {
  try {
    const response = await instance.get(`/products`, {
      params: {
        page: 1,
        pageSize: 4,
        orderBy: 'favorite',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await instance.get('/products', {
      params: {
        page: 1,
        pageSize: 10,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
