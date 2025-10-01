const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/comments`;

// comments list get
export const fetchComments = async (postId) => {
  const response = await fetch(`${API_URL}?postId=${postId}`);
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }

  return await response.json();
};

// comment post
export const addComment = async ({ content, postId }) => {
  const newComment = {
    postId: postId,
    content: content,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error("게시글을 추가하는데 실패했습니다.");
  }
};

// comment delete
export const deleteComment = async ({ id, postId }) => {
  const response = await fetch(`${API_URL}/${id}?postId=${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("댓글 삭제하는데 실패했습니다.");
  }

  return true;
};
