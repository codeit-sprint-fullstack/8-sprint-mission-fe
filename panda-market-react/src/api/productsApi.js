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

export const getProducts = async (page, pageSize, keyword = '', orderBy = 'recent') => {
  try {
    const response = await instance.get('/products', {
      params: {
        page,
        pageSize,
        keyword,
        orderBy,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
