import { API_URL } from '@/config/config';
import { customFetch, customAuthFetch } from './fetchClient';
import { CommentResponce } from '@/constants/commnetConstants';

interface commentRequest {
  content: string;
}

/* 상품 문의(댓글) */
export async function getProductComments(id: string) {
  const result = await customFetch.get<CommentResponce[]>(`${API_URL}/products/${id}/comments`);
  return result;
}

export async function createProductComment(id: string, data: commentRequest) {
  const result = await customAuthFetch.post<commentRequest, CommentResponce>(`${API_URL}/products/${id}/comments`, data);
  return result;
}

/* 게시글 댓글 */
export async function getArticleComments(id: string) {
  const result = await customFetch.get<CommentResponce[]>(`${API_URL}/articles/${id}/comments`);
  return result;
}

export async function createArticleComment(id: string, data: commentRequest) {
  const result = await customAuthFetch.post<commentRequest, CommentResponce>(`${API_URL}/articles/${id}/comments`, data);
  return result;
}

/* 공통 */
export async function updateComment(id: string, data: commentRequest) {
  const result = await customAuthFetch.patch<commentRequest, CommentResponce>(`${API_URL}/comments/${id}`, data);
  return result;
}

export async function deleteComment(id: string) {
  const result = await customAuthFetch.delete(`${API_URL}/comments/${id}`);
  return result;
}
