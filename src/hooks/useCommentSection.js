import { useState, useEffect, useCallback } from 'react';

import { useAuth } from '@/providers/AuthProvider';
import { useComments } from '@/providers/CommentProvider';

/**
 * 댓글 섹션 로직을 관리하는 커스텀 훅
 * @param {string} resourceId - 아티클 또는 프로덕트 ID
 * @param {string} type - 'article' 또는 'product'
 */
export function useCommentSection(resourceId, type = 'article') {
  const { user } = useAuth();
  const {
    comments,
    getArticleComments,
    getProductComments,
    createArticleComment,
    createProductComment,
    updateComment,
    deleteComment,
    loading: commentLoading,
    error: commentError,
  } = useComments();

  const [commentInput, setCommentInput] = useState('');
  const [commentMenuOpenId, setCommentMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = !!user;

  // 댓글 목록 불러오기
  const loadComments = useCallback(async () => {
    if (!resourceId) return;
    try {
      if (type === 'article') {
        await getArticleComments(resourceId, { limit: 50 });
      } else {
        await getProductComments(resourceId);
      }
    } catch (e) {
      console.error('댓글 로드 실패', e);
    }
  }, [resourceId, type, getArticleComments, getProductComments]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // 날짜 포맷팅
  const formatCreatedAt = (createdAt) => {
    try {
      return new Date(createdAt).toLocaleString();
    } catch {
      return String(createdAt || '');
    }
  };

  // 댓글 등록
  const handleSubmitComment = async (e) => {
    e?.preventDefault?.();
    const content = commentInput.trim();
    if (!content || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (type === 'article') {
        await createArticleComment(resourceId, { content });
      } else {
        await createProductComment(resourceId, { content });
      }
      setCommentInput('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 수정 시작
  const handleStartEdit = (comment) => {
    setEditingId(comment.id);
    setEditingText(comment.content || '');
    setCommentMenuOpenId(null);
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // 댓글 수정 제출
  const handleUpdateComment = async (commentId) => {
    const content = editingText.trim();
    if (!content) return;

    try {
      await updateComment(commentId, { content });
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;

    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return {
    // 상태
    user,
    isLoggedIn,
    comments,
    commentInput,
    setCommentInput,
    commentMenuOpenId,
    setCommentMenuOpenId,
    editingId,
    editingText,
    setEditingText,
    isSubmitting,
    commentLoading,
    commentError,

    // 함수
    formatCreatedAt,
    handleSubmitComment,
    handleStartEdit,
    handleCancelEdit,
    handleUpdateComment,
    handleDeleteComment,
  };
}
