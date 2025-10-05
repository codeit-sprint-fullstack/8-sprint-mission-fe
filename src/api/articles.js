const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ARTICLE_API_URL = `${BASE_URL}/articles`;

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 게시글 목록 조회
export const fetchArticles = async (limit = 10) => {
  const res = await fetch(`${ARTICLE_API_URL}?limit=${limit}`);
  if (!res.ok) {
    throw new Error("게시글 목록 가져오기 실패");
  }
  const data = await res.json();

  return (data.list ?? []).map((b) => ({
    ...b,
    nickname: b.nickname ?? "테스트유저",
    // likeCount: b.likeCount ?? Math.floor(Math.random() * 100),
    createdAt: formatDate(b.createdAt),
    updatedAt: formatDate(b.updatedAt),
  }));
};

// 게시글 상세 조회
export const fetchArticle = async (id) => {
  const res = await fetch(`${ARTICLE_API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("게시글 가져오기 실패");
  }
  const data = await res.json();

  return {
    ...data,
    nickname: data.nickname ?? "테스트유저",
    // likeCount: data.likeCount ?? Math.floor(Math.random() * 100),
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
};

// 게시글 추가
export const addArticle = async ({ title, content }) => {
  const newBoard = {
    title,
    content,
  };

  const res = await fetch(ARTICLE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBoard),
  });

  if (!res.ok) {
    throw new Error("게시글 추가 실패");
  }

  return await res.json();
};

// 게시글 수정
export const updateArticle = async (id, { title, content }) => {
  const res = await fetch(`${ARTICLE_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정 실패");
  }
  return await res.json();
};

// 게시글 삭제
export const deleteArticle = async (id) => {
  const res = await fetch(`${ARTICLE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("게시글 삭제 실패");
  }
  return true;
};
