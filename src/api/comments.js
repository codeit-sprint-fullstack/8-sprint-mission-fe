const API_URL = "http://localhost:5000/comments";

// 댓글 목록 조회
export const fetchComments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("댓글 목록 가져오기 실패");
  }
  return await res.json();
};

// 댓글 추가
export const addComment = async (comment) => {
  const newComment = {
    content: comment,
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!res.ok) {
    throw new Error("댓글 추가 실패");
  }

  return await res.json();
};

// 댓글 수정
export const updateComment = async (id, comment) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: comment,
    }),
  });

  if (!res.ok) {
    throw new Error("댓글 수정 실패");
  }

  return await res.json();
};

// 댓글 삭제
export const deleteComment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("댓글 삭제 실패");
  }

  return await res.json();
};
