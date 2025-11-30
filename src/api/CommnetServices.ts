import { customFetch, customAuthFetch } from './fetchClient';
import { CommentRequest, CommentResponce } from '@/constants/commnetType';

/* 상품 문의(댓글) */
export async function getProductComments(id: string) {
  const result = await customFetch.get<CommentResponce[]>(`/products/${id}/comments`);
  return result;
}

export async function createProductComment(id: string, data: CommentRequest) {
  const result = await customAuthFetch.post<CommentRequest, CommentResponce>(
    `/products/${id}/comments`,
    data
  );
  return result;
}

/* 게시글 댓글 */
export async function getArticleComments(id: string) {
  const result = await customFetch.get<CommentResponce[]>(`/articles/${id}/comments`);
  return result;
}

export async function createArticleComment(id: string, data: CommentRequest) {
  const result = await customAuthFetch.post<CommentRequest, CommentResponce>(
    `/articles/${id}/comments`,
    data
  );
  return result;
}

/* 공통 */
export async function updateComment(id: string, data: CommentRequest) {
  const result = await customAuthFetch.patch<CommentRequest, CommentResponce>(
    `/comments/${id}`,
    data
  );
  return result;
}

export async function deleteComment(id: string) {
  const result = await customAuthFetch.delete(`/comments/${id}`);
  return result;
}
