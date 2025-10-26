import { defaultFetch } from "./fetchClient";

const ARTICLE_API_URL = "/articles";

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 게시글 목록 조회
export const fetchArticles = async () => {
  const data = await defaultFetch(ARTICLE_API_URL);
  return (data.list ?? []).map((a) => ({
    ...a,
    createdAt: formatDate(a.createdAt),
    updatedAt: formatDate(a.updatedAt),
  }));
};

// 게시글 상세 조회
export const fetchArticle = async (id) => {
  const data = await defaultFetch(`${ARTICLE_API_URL}/${id}`);
  return {
    ...data,
    nickname: data.nickname ?? "익명 사용자",
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
};

// 게시글 등록
export const addArticle = async ({ title, content, images }) => {
  return defaultFetch(ARTICLE_API_URL, {
    method: "POST",
    body: JSON.stringify({ title, content, images }),
  });
};

// 게시글 수정
export const updateArticle = async (id, { title, content, images }) => {
  return defaultFetch(`${ARTICLE_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content, images }),
  });
};

// 게시글 삭제
export const deleteArticle = async (id) => {
  return defaultFetch(`${ARTICLE_API_URL}/${id}`, { method: "DELETE" });
};
