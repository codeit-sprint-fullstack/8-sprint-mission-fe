"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useArticles } from "@/providers/ArticleProvider";
import { useComments } from "@/providers/CommentProvider";

// 외부에서 open/onClose/articleId를 전달받아 메뉴만 렌더링하는 드롭다운 (수정/삭제)
export default function DropdownMenu({
  open = false,
  onClose,
  type = "article", // 'article' | 'comment'
  articleId: propArticleId,
  commentId: propCommentId,
  onEdit, // for comment inline edit trigger
  onDeleted, // optional callback after delete
}) {
  const ref = useRef(null);
  const router = useRouter();
  const { currentArticle, deleteArticle } = useArticles();
  const { deleteComment } = useComments();

  // 우선순위: prop > context
  const articleId = propArticleId ?? currentArticle?.id;
  const commentId = propCommentId;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  const onDelete = async () => {
    if (type === "article") {
      if (!articleId) return;
      const ok = window.confirm('정말 삭제하시겠어요? 이 동작은 되돌릴 수 없어요.');
      if (!ok) return;
      try {
        await deleteArticle(articleId);
        onClose?.();
        onDeleted?.();
        router.replace('/article');
      } catch (_) {
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
      } catch (_) {
        alert('삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 mt-2 w-36 rounded-lg border bg-white shadow-lg right-0"
      style={{ borderColor: 'var(--gray-200)' }}
      role="menu"
    >
      <ul className="py-1">
        <li role="none">
          {type === 'article' ? (
            <Link
              href={articleId ? `/article/edit/${articleId}` : '#'}
              className={`block px-4 py-2 text-sm hover:bg-gray-50 ${!articleId ? 'pointer-events-none opacity-50' : ''}`}
              style={{ color: 'var(--gray-800)' }}
              role="menuitem"
              onClick={() => onClose?.()}
            >
              수정하기
            </Link>
          ) : (
            <button
              type="button"
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${!commentId ? 'pointer-events-none opacity-50' : ''}`}
              style={{ color: 'var(--gray-800)' }}
              role="menuitem"
              onClick={() => {
                onEdit?.();
                onClose?.();
              }}
              disabled={!commentId}
            >
              수정하기
            </button>
          )}
        </li>
        <li role="none">
          <button
            type="button"
            onClick={onDelete}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
            style={{ color: 'var(--gray-800)' }}
            role="menuitem"
            disabled={type === 'article' ? !articleId : !commentId}
          >
            삭제하기
          </button>
        </li>
      </ul>
    </div>
  );
}
