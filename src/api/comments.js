const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ARTICLE_API_URL = `${BASE_URL}/articles`;
const COMMENT_API_URL = `${BASE_URL}/comments`;
const PRODUCT_API_URL = `${BASE_URL}/products`;

// 게시글 상세 페이지
// 댓글 목록 조회
export const fetchComments = async (articleId, limit = 5) => {
  const res = await fetch(
    `${ARTICLE_API_URL}/${articleId}/comments?limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("게시글 댓글 목록 가져오기 실패");
  }
  const data = await res.json();

  return (data.list ?? []).map((c) => ({
    ...c,
    nickname: c.nickname ?? "테스트유저",
  }));
};

// 댓글 추가
export const addComment = async (articleId, comment) => {
  const res = await fetch(`${ARTICLE_API_URL}/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!res.ok) {
    throw new Error("게시글 댓글 추가 실패");
  }

  return await res.json();
};

// 댓글 수정
export const updateComment = async (id, comment) => {
  const res = await fetch(`${COMMENT_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!res.ok) {
    throw new Error("댓글 수정 실패");
  }

  return await res.json();
};

// 댓글 삭제
export const deleteComment = async (id) => {
  const res = await fetch(`${COMMENT_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("댓글 삭제 실패");
  }

  return true;
};

// 상품 상세 페이지
// 댓글 목록 조회
export const fetchItemComments = async (productId, limit = 5) => {
  const res = await fetch(
    `${PRODUCT_API_URL}/${productId}/comments?limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("상품 댓글 목록 가져오기 실패");
  }
  const data = await res.json();
  return (data.list ?? []).map((c) => ({
    ...c,
    nickname: c.nickname ?? "테스트유저",
  }));
};

// 댓글 추가
export const addItemComment = async (productId, comment) => {
  const res = await fetch(`${PRODUCT_API_URL}/${productId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!res.ok) {
    throw new Error("상품 댓글 추가 실패");
  }
  return await res.json();
};
