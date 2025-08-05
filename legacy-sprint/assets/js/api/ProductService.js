import { pandaMarketApi } from './main.js'

/**
 * 제품 목록 조회
 * @returns {Promise<object>}
 */
async function getProductList () {
  try {
    const response = await pandaMarketApi.get('/products', {
      params: {
        page: 1,
        pageSize: 10,
        keyword: ''
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * 제품 조회
 * @param {number} productId 
 * @returns {Promise<object>}
 */
async function getProduct (productId) {
  try {
    const response = await pandaMarketApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * 제품 생성
 * @param {object} createProductBody 
 * @returns {Promise<object>}
 */
async function createProduct (createProductBody) {
  try {
    const response = await pandaMarketApi.post('/products', createProductBody)
    return response.data;
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * 제품 수정
 * @param {number} productId 
 * @param {object} patchProductBody 
 * @returns {Promise<object>}
 */
async function patchProduct (productId, patchProductBody) {
  try {
    const response = await pandaMarketApi.patch(`/products/${productId}`, patchProductBody);
    return response.data;
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * 제품 삭제
 * @param {number} productId 
 * @returns {Promise<object>}
 */
async function deleteProduct (productId) {
  try {
    const response = await pandaMarketApi.delete(`/products/${productId}`)
    return response.data;
  } catch (error) {
    console.error(error.message)
  }
}

export const productService = { getProductList, getProduct, createProduct, patchProduct, deleteProduct };