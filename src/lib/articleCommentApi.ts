import { api } from './apiClient';
import { Comment, CreateCommentData, UpdateCommentData, CommentParams } from '@/types';

// ============================================
// 자유게시판 댓글 관련 API
// ============================================

/**
 * 자유게시판 댓글 등록
 */
export const createArticleComment = async (
  articleId: number,
  commentData: CreateCommentData,
): Promise<Comment> =>
  api.post(`/comments/article/${articleId}`, commentData, { auth: true }) as Promise<Comment>;

/**
 * 자유게시판 댓글 목록 조회
 */
export const getArticleComments = async (
  articleId: number,
  params: CommentParams = {},
): Promise<Comment[]> => {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.cursor) searchParams.append('cursor', params.cursor.toString());

  const response = (await api.get(
    `/comments/article/${articleId}?${searchParams.toString()}`,
  )) as any;
  return response?.list || response?.comments || [];
};

/**
 * 댓글 수정
 */
export const updateComment = async (
  commentId: number,
  commentData: UpdateCommentData,
): Promise<Comment> =>
  api.patch(`/comments/${commentId}`, commentData, { auth: true }) as Promise<Comment>;

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: number): Promise<void> => {
  await api.delete(`/comments/${commentId}`, { auth: true });
};
