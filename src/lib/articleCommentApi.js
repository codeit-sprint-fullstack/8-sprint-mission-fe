import { api } from './apiClient';

// ============================================
// 자유게시판 댓글 관련 API
// ============================================

/**
 * 자유게시판 댓글 등록
 * @param {string|number} articleId - 게시글 ID
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} 생성된 댓글 정보
 */
export const createArticleComment = async (articleId, commentData) =>
  api.post(`/comments/article/${articleId}`, commentData, { auth: true });

/**
 * 자유게시판 댓글 목록 조회
 * @param {string|number} articleId - 게시글 ID
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.limit - 페이지당 아이템 수
 * @returns {Promise<Object>} 댓글 목록 응답
 */
export const getArticleComments = async (articleId, params = {}) => {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.append('limit', params.limit);
  return api.get(`/comments/article/${articleId}?${searchParams.toString()}`);
};

/**
 * 댓글 수정
 * @param {string|number} commentId - 댓글 ID
 * @param {Object} commentData - 수정할 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} 수정된 댓글 정보
 */
export const updateComment = async (commentId, commentData) =>
  api.patch(`/comments/${commentId}`, commentData, { auth: true });

/**
 * 댓글 삭제
 * @param {string|number} commentId - 댓글 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteComment = async (commentId) =>
  api.delete(`/comments/${commentId}`, { auth: true });
