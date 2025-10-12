'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useArticles } from '@/providers/ArticleProvider';
import { useComments } from '@/providers/CommentProvider';

// 외부에서 open/onClose/articleId를 전달받아 메뉴만 렌더링하는 드롭다운 (수정/삭제)
export default function DropdownMenu({
  open = false,
  onClose,
  type = 'article', // 'article' | 'comment'
  articleId: propArticleId,
  commentId: propCommentId,
  onEdit, // for comment inline edit trigger
  onDeleted, // optional callback after delete
}) {
  const ref = useRef(null);
  const firstItemRef = useRef(null);
  const lastItemRef = useRef(null);
  const router = useRouter();
  const { currentArticle, deleteArticle } = useArticles();
  const { deleteComment } = useComments();

  // 우선순위: prop > context
  const articleId = propArticleId ?? currentArticle?.id;
  const commentId = propCommentId;

  // 바깥 클릭 시 닫기
  // 외부 클릭 / ESC 닫기
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'Tab') {
        // focus trap
        if (e.shiftKey && document.activeElement === firstItemRef.current) {
          e.preventDefault();
          lastItemRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === lastItemRef.current) {
          e.preventDefault();
          firstItemRef.current?.focus();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  // 열릴 때 첫 항목 포커스
  useEffect(() => {
    if (open) {
      setTimeout(() => firstItemRef.current?.focus(), 0);
    }
  }, [open]);

  const onDelete = useCallback(async () => {
    if (type === 'article') {
      if (!articleId) return;
      const ok = window.confirm('정말 삭제하시겠어요? 이 동작은 되돌릴 수 없어요.');
      if (!ok) return;
      try {
        await deleteArticle(articleId);
        onClose?.();
        onDeleted?.();
        router.replace('/article');
      } catch (e) {
        console.error('게시글 삭제 실패', e);
        alert('삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    } else {
      if (!commentId) return;
      const ok = window.confirm('댓글을 삭제하시겠어요?');
      if (!ok) return;
      try {
        await deleteComment(commentId);
        onClose?.();
        onDeleted?.();
      } catch (e) {
        console.error('댓글 삭제 실패', e);
        alert('삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  }, [type, articleId, commentId, deleteArticle, deleteComment, onClose, onDeleted, router]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 mt-2 w-40 rounded-lg border bg-white shadow-lg right-0"
      style={{ borderColor: 'var(--gray-200)' }}
      role="menu"
      aria-label={type === 'article' ? '게시글 메뉴' : '댓글 메뉴'}
    >
      <ul className="py-1" role="presentation">
        <li role="none">
          {type === 'article' ? (
            <Link
              href={articleId ? `/article/edit/${articleId}` : '#'}
              ref={firstItemRef}
              className={`block px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 ${!articleId ? 'pointer-events-none opacity-50' : ''}`}
              style={{ color: 'var(--gray-800)' }}
              role="menuitem"
              tabIndex={0}
              onClick={() => onClose?.()}
              aria-disabled={!articleId || undefined}
            >
              수정하기
            </Link>
          ) : (
            <button
              type="button"
              ref={firstItemRef}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 ${!commentId ? 'pointer-events-none opacity-50' : ''}`}
              style={{ color: 'var(--gray-800)' }}
              role="menuitem"
              onClick={() => {
                onEdit?.();
                onClose?.();
              }}
              disabled={!commentId}
              aria-disabled={!commentId || undefined}
            >
              수정하기
            </button>
          )}
        </li>
        <li role="none">
          <button
            type="button"
            ref={lastItemRef}
            onClick={onDelete}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
            style={{ color: 'var(--gray-800)' }}
            role="menuitem"
            disabled={type === 'article' ? !articleId : !commentId}
            aria-disabled={(type === 'article' ? !articleId : !commentId) || undefined}
          >
            삭제하기
          </button>
        </li>
      </ul>
    </div>
  );
}
