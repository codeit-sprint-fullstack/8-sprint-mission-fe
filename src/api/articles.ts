import { defaultFetch } from "./fetchClient";
import { Article, ArticleInput, UseCursorParams } from "@/types/entities";

const ARTICLE_API_URL = "/articles";

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 게시글 목록 조회
export const fetchArticles = async (
  params: UseCursorParams
): Promise<Article[]> => {
  const query = new URLSearchParams();
  if (params.cursor) query.append("cursor", params.cursor);
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.search) query.append("search", params.search);
  if (params?.order) query.append("order", params.order);

  const data = await defaultFetch<{ list: Article[] }>(
    `${ARTICLE_API_URL}?${query.toString()}`
  );

  return (data.list ?? []).map((a) => ({
    ...a,
    createdAt: formatDate(a.createdAt!),
    updatedAt: formatDate(a.updatedAt!),
    // createdAt: a.createdAt ? formatDate(a.createdAt) : "",
    // updatedAt: a.updatedAt ? formatDate(a.updatedAt) : "",
  }));
};

// 게시글 상세 조회
export const fetchArticle = async (
  id: string
): Promise<Article & { nickname: string }> => {
  const data = await defaultFetch<Article & { nickname?: string }>(
    `${ARTICLE_API_URL}/${id}`
  );
  return {
    ...data,
    nickname: data.nickname ?? "익명 사용자",
    createdAt: formatDate(data.createdAt!),
    updatedAt: formatDate(data.updatedAt!),
    // createdAt: data.createdAt ? formatDate(data.createdAt) : "",
    // updatedAt: data.updatedAt ? formatDate(data.updatedAt) : "",
  };
};

// 게시글 등록
export const addArticle = async ({
  title,
  content,
  images,
}: ArticleInput): Promise<Article> => {
  return defaultFetch<Article>(ARTICLE_API_URL, {
    method: "POST",
    body: JSON.stringify({ title, content, images }),
  });
};

// 게시글 수정
export const updateArticle = async (
  id: string,
  article: Partial<ArticleInput>
): Promise<Article> => {
  return defaultFetch<Article>(`${ARTICLE_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(article),
  });
};

// 게시글 삭제
export const deleteArticle = async (
  id: string
): Promise<{ success: boolean }> => {
  return defaultFetch<{ success: boolean }>(`${ARTICLE_API_URL}/${id}`, {
    method: "DELETE",
  });
};
