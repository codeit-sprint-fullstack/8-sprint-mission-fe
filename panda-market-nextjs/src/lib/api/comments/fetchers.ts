import { fetchWithAuth } from "../auth/fetchers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

/**
 * 댓글 생성
 * @param id
 * @param comment
 * @returns Comment
 */
const createComment = async (id: string, comment: string) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response?.ok) {
      throw new Error("댓글 생성 실패");
    }
    return response?.json();
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
    const response = await fetchWithAuth(
      `${API_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response?.ok) {
      throw new Error("댓글 삭제 실패");
    }
    return response?.status;
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
    const response = await fetchWithAuth(
      `${API_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ content: comment }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response?.ok) {
      throw new Error("댓글 수정 실패");
    }
    return response?.json();
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
    // response가 없는 경우 (fetchWithAuth에서 로그인 리다이렉트 등)
    if (!response) {
      throw new Error("인증이 필요합니다.");
    }

    // response가 실패한 경우
    if (!response.ok) {
      let errorMessage = "상품 댓글 등록 실패";
      try {
        const error = await response.json();
        // error 객체 구조에 따라 안전하게 접근
        errorMessage = error?.message || error?.error || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new Error(errorMessage);
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
const updateProductComment = async (
  id: string,
  commentId: string,
  comment: string
) => {
  if (!commentId || !comment) {
    throw new Error("값이 비어있습니다.");
  }

  try {
    const response = await fetchWithAuth(
      `${API_URL}/products/${id}/comments/${commentId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ content: comment }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
const deleteProductComment = async (id: string, commentId: string) => {
  try {
    const response = await fetchWithAuth(
      `${API_URL}/products/${id}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response?.ok) {
      throw new Error("상품 댓글 삭제 실패");
    }
    return response?.status;
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
