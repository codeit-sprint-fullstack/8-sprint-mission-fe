import { api, apiFetch } from './apiClient';

/**
 * 상품 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 아이템 수
 * @param {string} params.sort - 정렬 방식 ('recent' | 'favorite')
 * @param {string} params.search - 검색어
 * @returns {Promise<Object>} 상품 목록 응답
 */
export const getProducts = async (params = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);
  if (params.sort) searchParams.append('sort', params.sort);
  if (params.search) searchParams.append('search', params.search);
  return api.get(`/products?${searchParams.toString()}`);
};

/**
 * 베스트 상품 조회 (좋아요 많은 순)
 * @returns {Promise<Array>} 베스트 상품 목록
 */
export const getBestProducts = async () => api.get('/products?sort=favorite&limit=4');

/**
 * 상품 단건 조회
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<Object>} 상품 상세 정보
 */
export const getProduct = async (productId) => api.get(`/products/${productId}`);

/**
 * 상품 등록
 * @param {Object} productData - 상품 데이터
 * @param {string} productData.name - 상품명
 * @param {string} productData.description - 상품 설명
 * @param {number} productData.price - 가격
 * @param {string[]} productData.tags - 태그 배열
 * @param {string[]} productData.images - 이미지 URL 배열
 * @returns {Promise<Object>} 생성된 상품 정보
 */
export const createProduct = async (productData) => {
  return api.post('/products', productData, { auth: true });
};

/**
 * 상품 수정
 * @param {string|number} productId - 상품 ID
 * @param {Object} productData - 수정할 상품 데이터
 * @param {string} productData.name - 상품명
 * @param {string} productData.description - 상품 설명
 * @param {number} productData.price - 가격
 * @param {string[]} productData.tags - 태그 배열
 * @param {string[]} productData.images - 이미지 URL 배열
 * @returns {Promise<Object>} 수정된 상품 정보
 */
export const updateProduct = async (productId, productData) => {
  return api.patch(`/products/${productId}`, productData, { auth: true });
};

/**
 * 상품 삭제
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) =>
  api.delete(`/products/${productId}`, { auth: true });

/**
 * 상품 좋아요 토글
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<Object>} 업데이트된 좋아요 정보
 */
export const toggleProductFavorite = async (productId) => {
  return api.post(`/products/${productId}/favorite`, {}, { auth: true });
};
