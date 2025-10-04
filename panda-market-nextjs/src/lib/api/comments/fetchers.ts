const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CODEIT_API_URL = process.env.NEXT_PUBLIC_CODEIT_API_URL;

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface CommentList {
  comments: Comment[];
}

/**
 * 댓글 생성
 * @param id
 * @param comment
 * @returns Comment
 */
const createComment = async (id: string, comment: string) => {
  try {
    const response = await fetch(`${API_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("댓글 생성 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 조회
 * @param id
 * @returns Comment
 */
const getComments = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/articles/${id}/comments`);
    if (!response.ok) {
      throw new Error("댓글 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 삭제
 * @param id
 * @returns status 204
 */
const deleteComment = async (articleId: string, commentId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("댓글 삭제 실패");
    }
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 수정
 * @param id
 * @param comment
 * @returns Comment
 */
const updateComment = async (
  articleId: string,
  commentId: string,
  comment: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ content: comment }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("댓글 수정 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 댓글 목록 조회
 * @param id
 * @returns Comment
 */
const getProductComments = async (id: string) => {
  try {
    const response = await fetch(`${CODEIT_API_URL}/products/${id}/comments`);
    if (!response.ok) {
      throw new Error("상품 댓글 목록 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const commentsApi = {
  createComment,
  getComments,
  deleteComment,
  updateComment,
};
