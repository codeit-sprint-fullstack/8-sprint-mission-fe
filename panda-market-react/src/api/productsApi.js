import {
  validatePostProductResponse,
  validateProductResponse,
} from '../lib/validation/productResponse.guard.js';
import { instance } from './client.js';

export const getBestProducts = async (pageSize = 4) => {
  try {
    if (!Number.isInteger(pageSize) || pageSize < 1) {
      throw new Error('pageSize는 정수 1이상의 숫자여야 합니다.');
    }

    const response = await instance.get(`/products`, {
      params: {
        page: 1,
        pageSize,
        orderBy: 'favorite',
      },
    });

    validateProductResponse(response, '베스트 상품 데이터를 불러오는데 실패했습니다.');

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (page = 1, pageSize = 10, orderBy = 'recent', keyword = '') => {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error('page는 정수 1이상의 숫자여야 합니다.');
  }

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error('pageSize는 정수 1이상의 숫자여야 합니다.');
  }

  if (!['favorite', 'recent'].includes(orderBy)) {
    throw new Error('orderBy는 favorite, recent 중 하나여야 합니다.');
  }

  try {
    const response = await instance.get('/products', {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      },
    });

    validateProductResponse(response, '판매 중인 상품 데이터를 불러오는데 실패했습니다.');

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postProduct = async (product) => {
  try {
    const response = await instance.post('/create', product);

    validatePostProductResponse(response, '상품 등록에 실패했습니다.');

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
