import { defaultFetch } from "./fetchClient";
import { Comment } from "@/types/entities";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ARTICLE_API_URL = `${BASE_URL}/articles`;
const COMMENT_API_URL = `${BASE_URL}/comments`;
const PRODUCT_API_URL = `${BASE_URL}/products`;

// 게시글 상세 페이지
// 댓글 목록 조회
export const fetchComments = async (articleId: string): Promise<Comment[]> => {
  const data = await defaultFetch<{ list: Comment[] }>(
    `${ARTICLE_API_URL}/${articleId}/comments?limit=5`
  );

  return (data.list ?? []).map((c) => ({
    ...c,
    nickname: c.nickname ?? "테스트유저",
  }));
};

// 댓글 추가
export const addComment = async (
  articleId: string,
  comment: { content: string }
): Promise<Comment> => {
  return await defaultFetch<Comment>(
    `${ARTICLE_API_URL}/${articleId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(comment),
    }
  );
};

// 댓글 수정
export const updateComment = async (
  id: string,
  comment: { content: string }
): Promise<Comment> => {
  return await defaultFetch<Comment>(`${COMMENT_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(comment),
  });
};

// 댓글 삭제
export const deleteComment = async (
  id: string
): Promise<{ success: boolean }> => {
  return await defaultFetch<{ success: boolean }>(`${COMMENT_API_URL}/${id}`, {
    method: "DELETE",
  });
};

// 상품 상세 페이지
// 댓글 목록 조회
export const fetchItemComments = async (
  productId: string
): Promise<Comment[]> => {
  const data = await defaultFetch<{ list: Comment[] }>(
    `${PRODUCT_API_URL}/${productId}/comments?limit=5`
  );
  return (data.list ?? []).map((c) => ({
    ...c,
    nickname: c.nickname ?? "테스트유저",
  }));
};

// 댓글 추가
export const addItemComment = async (
  productId: string,
  comment: { content: string }
): Promise<Comment> => {
  return await defaultFetch<Comment>(
    `${PRODUCT_API_URL}/${productId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(comment),
    }
  );
};
