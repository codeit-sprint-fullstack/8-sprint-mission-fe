import { api, apiFetch } from './apiClient';

/**
 * 상품 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.pageSize - 페이지당 아이템 수
 * @param {string} params.orderBy - 정렬 방식 ('recent' | 'favorite')
 * @param {string} params.keyword - 검색어
 * @returns {Promise<Object>} 상품 목록 응답
 */
export const getProducts = async (params = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page);
  if (params.pageSize) searchParams.append('pageSize', params.pageSize);
  if (params.orderBy) searchParams.append('orderBy', params.orderBy);
  if (params.keyword) searchParams.append('keyword', params.keyword);
  return api.get(`/products?${searchParams.toString()}`);
};

/**
 * 상품 상세 조회
 * @param {string|number} productId - 상품 ID
 * @returns {Promise<Object>} 상품 상세 정보
 */
export const getProduct = async (productId) => api.get(`/products/${productId}`);

/**
 * 상품 수정
 * @param {string|number} productId - 상품 ID
 * @param {Object} productData - 수정할 상품 데이터
 * @returns {Promise<Object>} 수정된 상품 정보
 */
export const updateProduct = async (productId, productData) =>
  api.patch(`/products/${productId}`, productData, { auth: true });

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
 * @param {boolean} isFavorite - 현재 좋아요 상태
 * @returns {Promise<Object>} 업데이트된 상품 정보
 */
export const toggleProductFavorite = async (productId, isFavorite) => {
  //토글 안됨 post 요청시 카운트는 올라가는데 isFavorite 값은 그대로임
  const method = isFavorite ? 'DELETE' : 'POST';
  await apiFetch(`/products/${productId}/favorite`, { method, auth: true, parseJson: false });
  return getProduct(productId);
};
