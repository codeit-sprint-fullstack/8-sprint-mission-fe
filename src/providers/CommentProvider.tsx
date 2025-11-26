'use client';

import * as articleCommentService from '@/lib/articleCommentApi';
import * as productCommentService from '@/lib/productCommentApi';
import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Comment, CreateCommentData, UpdateCommentData, CommentParams } from '@/types';

interface CommentContextValue {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  createArticleComment: (articleId: string, commentData: CreateCommentData) => Promise<Comment>;
  getArticleComments: (articleId: string, params?: CommentParams) => Promise<Comment[]>;
  createProductComment: (productId: string, commentData: CreateCommentData) => Promise<Comment>;
  getProductComments: (productId: string, params?: CommentParams) => Promise<Comment[]>;
  updateComment: (commentId: string , commentData: UpdateCommentData) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextValue | undefined>(undefined);

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

interface CommentProviderProps {
  children: ReactNode;
}

export default function CommentProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown, message: string) => {
    console.error(message, err);
    setError((err as Error)?.message || message);
    setLoading(false);
  }, []);

  const createArticleComment = useCallback(
    async (articleId: string, commentData: CreateCommentData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleCommentService.createArticleComment(articleId, commentData);
        setComments((prev) => [response, ...prev]);
        return response;
      } catch (error) {
        handleError(error, '댓글 등록에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const getArticleComments = useCallback(
    async (articleId: string, params: CommentParams = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleCommentService.getArticleComments(articleId, params);
        setComments(response);
        return response;
      } catch (error) {
        handleError(error, '댓글 목록을 가져오는데 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const createProductComment = useCallback(
    async (productId: string, commentData: CreateCommentData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await productCommentService.createProductComment(productId, commentData);
        setComments((prev) => [response, ...prev]);
        return response;
      } catch (error) {
        handleError(error, '댓글 등록에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const getProductComments = useCallback(
    async (productId: string, params: CommentParams = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await productCommentService.getProductComments(productId, params);
        setComments(response);
        return response;
      } catch (error) {
        handleError(error, '댓글 목록을 가져오는데 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const updateComment = useCallback(
    async (commentId: string | number, commentData: UpdateCommentData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await productCommentService.updateComment(commentId, commentData);
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, ...response };
            }
            return comment;
          }),
        );
        return response;
      } catch (error) {
        handleError(error, '댓글 수정에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const deleteComment = useCallback(
    async (commentId: string | number) => {
      try {
        setLoading(true);
        setError(null);
        await productCommentService.deleteComment(commentId);
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      } catch (error) {
        handleError(error, '댓글 삭제에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const value = useMemo(
    () => ({
      comments,
      loading,
      error,
      createArticleComment,
      getArticleComments,
      createProductComment,
      getProductComments,
      updateComment,
      deleteComment,
    }),
    [
      comments,
      loading,
      error,
      createArticleComment,
      getArticleComments,
      createProductComment,
      getProductComments,
      updateComment,
      deleteComment,
    ],
  );

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}
