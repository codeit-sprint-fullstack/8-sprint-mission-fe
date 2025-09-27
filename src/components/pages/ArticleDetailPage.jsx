"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { useArticles } from "@/providers/ArticleProvider";
import { useComments } from "@/providers/CommentProvider";

/**
 * ArticleDetailPage
 * - 게시글 상세 조회 + 댓글 목록/작성
 * - props.articleId: string
 */
export default function ArticleDetailPage({ articleId }) {
  const { currentArticle, getArticleById, loading: articleLoading, error: articleError } = useArticles();
  const { comments, getArticleComments, createArticleComment, loading: commentLoading, error: commentError } = useComments();

  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (!articleId) return;
    getArticleById(articleId);
    getArticleComments(articleId, { limit: 50 }).catch(() => {});
  }, [articleId]);

  const onSubmitComment = async (e) => {
    e?.preventDefault?.();
    const content = commentInput.trim();
    if (!content) return;
    try {
      await createArticleComment(articleId, { content });
      setCommentInput("");
    } catch (_) {}
  };

  const createdAtText = useMemo(() => {
    const v = currentArticle?.createdAt;
    if (!v) return "";
    try {
      return new Date(v).toLocaleDateString();
    } catch {
      return String(v);
    }
  }, [currentArticle?.createdAt]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 제목과 메타 */}
      <div className="mb-6 border-b pb-6" style={{ borderColor: 'var(--gray-200)' }}>
        {articleLoading && (
          <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />
        )}
        {!articleLoading && (
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
            {currentArticle?.title || "제목 없음"}
          </h1>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-sm gap-2" style={{ color: 'var(--gray-500)' }}>
            <Image src={currentArticle?.avatar || "/images/icon/ic_profile.svg"} alt="작성자" width={20} height={20} />
            <span>{currentArticle?.author || currentArticle?.nickname || "익명"}</span>
            <span>{createdAtText}</span>
          </div>
          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>♥ {(Number(currentArticle?.likes || 0)).toLocaleString()}</div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mb-10 whitespace-pre-wrap leading-7" style={{ color: 'var(--gray-800)' }}>
        {articleError && (
          <p className="text-error mb-4">게시글을 불러오지 못했습니다.</p>
        )}
        {currentArticle?.image && (
          <div className="mb-6 w-full rounded-lg overflow-hidden border" style={{ borderColor: 'var(--gray-100)' }}>
            <Image src={currentArticle.image} alt={currentArticle.title} width={800} height={450} className="w-full h-auto object-cover" />
          </div>
        )}
        {currentArticle?.content || (
          <p className="text-gray-500">내용이 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력 */}
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--gray-900)' }}>댓글쓰기</h2>
        <form onSubmit={onSubmitComment} className="flex gap-2 items-start">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="flex-1 min-h-24 p-3 rounded-lg border text-sm"
            style={{ borderColor: 'var(--gray-200)', backgroundColor: '#F7F7F9', color: 'var(--gray-800)' }}
          />
          <Button type="submit" appearance="primary" style={{ minWidth: 72 }} disabled={commentLoading || !commentInput.trim()}>
            등록
          </Button>
        </form>
        {(commentError) && (
          <p className="text-error mt-2 text-sm">댓글을 처리하는 중 오류가 발생했습니다.</p>
        )}
      </section>

      {/* 댓글 목록 */}
      <section className="mb-12">
        {commentLoading && comments.length === 0 ? (
          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>댓글을 불러오는 중…</div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-sm" style={{ color: 'var(--gray-500)' }}>
            <div className="rounded-full bg-gray-100 px-3 py-1">아직 댓글이 없어요</div>
            <div>지금 첫 댓글을 달아보세요!</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--gray-100)', backgroundColor: '#fcfcfc' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>익명</span>
                  <span className="text-xs" style={{ color: 'var(--gray-400)' }}>
                    {(() => { try { return new Date(c.createdAt).toLocaleString(); } catch { return String(c.createdAt || ''); } })()}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--gray-800)' }}>{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 목록으로 돌아가기 */}
      <div className="flex justify-center">
        <Button as={Link} href="/article" appearance="primary">
          목록으로 돌아가기 ↩
        </Button>
      </div>
    </div>
  );
}
