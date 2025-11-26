import { api } from './apiClient';
import { Comment, CreateCommentData, UpdateCommentData, CommentParams } from '@/types';
import { commentSchema, commentsResponseSchema } from '@/schemas';

// ============================================
// 자유게시판 댓글 관련 API
// ============================================

/**
 * 자유게시판 댓글 등록
 */
export const createArticleComment = async (
  articleId: string | number,
  commentData: CreateCommentData,
): Promise<Comment> => {
  const response = await api.post(`/comments/article/${articleId}`, commentData, { auth: true });
  return commentSchema.parse(response);
};

/**
 * 자유게시판 댓글 목록 조회
 */
export const getArticleComments = async (
  articleId: string | number,
  params: CommentParams = {},
): Promise<Comment[]> => {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.cursor) searchParams.append('cursor', params.cursor.toString());

  const response = await api.get(
    `/comments/article/${articleId}?${searchParams.toString()}`,
  );
  const validated = commentsResponseSchema.parse(response);
  return validated?.list || validated?.comments || [];
};

/**
 * 댓글 수정
 */
export const updateComment = async (
  commentId: string | number,
  commentData: UpdateCommentData,
): Promise<Comment> => {
  const response = await api.patch(`/comments/${commentId}`, commentData, { auth: true });
  return commentSchema.parse(response);
};

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: string | number): Promise<void> => {
  await api.delete(`/comments/${commentId}`, { auth: true });
};
