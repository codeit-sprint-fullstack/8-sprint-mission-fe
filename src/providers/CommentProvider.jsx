"use client";

import * as commentService from "@/lib/commentApi";
import { createContext, useContext, useState } from "react";

const CommentContext = createContext({
  comments: [],
  loading: false,
  error: null,
  createArticleComment: () => {},
  getArticleComments: () => {},
  updateComment: () => {},
  deleteComment: () => {},
});

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
};

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error, message) => {
    console.error(message, error);
    setError(error.message || message);
    setLoading(false);
  };

  const createArticleComment = async (articleId, commentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.createArticleComment(articleId, commentData);
      // 새 댓글을 목록에 추가
      setComments(prev => [response, ...prev]);
      return response;
    } catch (error) {
      handleError(error, "댓글 등록에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getArticleComments = async (articleId, params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.getArticleComments(articleId, params);
      setComments(response);
      return response;
    } catch (error) {
      handleError(error, "댓글 목록을 가져오는데 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId, commentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.updateComment(commentId, commentData);
      // 수정된 댓글로 업데이트
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId ? response : comment
        )
      );
      return response;
    } catch (error) {
      handleError(error, "댓글 수정에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.deleteComment(commentId);
      // 삭제된 댓글을 목록에서 제거
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      return response;
    } catch (error) {
      handleError(error, "댓글 삭제에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider 
      value={{
        comments,
        loading,
        error,
        createArticleComment,
        getArticleComments,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
