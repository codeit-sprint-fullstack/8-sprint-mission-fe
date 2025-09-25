const API_URL = "http://localhost:5000/freeboard";
const COMMENT_API_URL = "http://localhost:5000/comments";

// 댓글 목록 조회
export const fetchComments = async (freeboardId) => {
  const res = await fetch(`${API_URL}/${freeboardId}/comments`);
  if (!res.ok) {
    throw new Error("댓글 목록 가져오기 실패");
  }
  const data = await res.json();

  return data.map((c) => ({
    ...c,
    user_name: "테스트유저",
    heart_count: Math.floor(Math.random() * 50),
  }));
};

// 댓글 추가
export const addComment = async (freeboardId, comment) => {
  const res = await fetch(`${API_URL}/${freeboardId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!res.ok) {
    throw new Error("댓글 추가 실패");
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
