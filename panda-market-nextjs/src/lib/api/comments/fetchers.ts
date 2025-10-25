import { fetchWithAuth } from "../auth/fetchers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface CommentList {
  list: Comment[];
}

/**
 * 댓글 생성
 * @param id
 * @param comment
 * @returns Comment
 */
const createComment = async (id: string, comment: string) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
const getProductComments = async (id: string, limit: number = 10) => {
  try {
    const response = await fetch(
      `${API_URL}/products/${id}/comments?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("상품 댓글 목록 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 댓글 등록
 * @param id
 * @param comment
 * @returns Comment
 */
const createProductComment = async (id: string, comment: string) => {
  if (!id || !comment) {
    throw new Error("값이 비어있습니다.");
  }

  try {
    const response = await fetchWithAuth(`${API_URL}/products/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response || !response.ok) {
      const error = await response?.json();
      throw new Error(error.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 댓글 수정
 * @param id
 * @param comment
 * @returns Comment
 */
const updateProductComment = async (commentId: string, comment: string) => {
  if (!commentId || !comment) {
    throw new Error("값이 비어있습니다.");
  }

  try {
    const response = await fetchWithAuth(`${API_URL}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response?.ok) {
      const error = await response?.json();
      throw new Error(error.message);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 댓글 삭제
 * @param commentId
 * @returns status code 200, 403, 404
 */
const deleteProductComment = async (commentId: string) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
    });
    if (!response?.ok) {
      const error = await response?.json();
      throw new Error(error.message);
    }
    return response.status;
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
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
};
