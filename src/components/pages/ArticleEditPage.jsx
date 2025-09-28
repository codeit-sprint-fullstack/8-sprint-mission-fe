"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/Button";
import { useArticles } from "@/providers/ArticleProvider";

/**
 * ArticleEditPage
 * - 게시글 등록/수정 공용 폼
 * - 수정: /article/edit?id={id}
 */
export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const editId = params?.id;
  const isEdit = Boolean(editId);

  const { currentArticle, getArticleById, createArticle, updateArticle, loading, error } = useArticles();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 수정 모드일 때 기존 데이터 로딩
  useEffect(() => {
    if (!isEdit || !editId) return;
    getArticleById(editId).catch(() => {});
  }, [isEdit, editId]);

  // 불러온 currentArticle 로컬 폼에 반영
  useEffect(() => {
    if (!isEdit) return;
    if (!currentArticle) return;
    setTitle(currentArticle.title || "");
    setContent(currentArticle.content || "");
  }, [isEdit, currentArticle?.id]);

  const isValid = useMemo(() => title.trim().length > 0 && content.trim().length > 0, [title, content]);

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      const payload = { title: title.trim(), content: content.trim() };
      const res = isEdit ? await updateArticle(editId, payload) : await createArticle(payload);
      const id = res?.id || editId;
      if (id) router.push(`/article/${id}`);
    } catch (_) {
      // provider에서 에러 관리
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold" style={{ color: "var(--gray-900)" }}>
          게시글 {editId ? '수정' : '쓰기'}
        </h1>
        <Button onClick={onSubmit} appearance="primary" disabled={!isValid || loading || submitting}>
          {editId ? '수정': '등록'}
        </Button>
      </div>

      {/* 제목 */}
      <section className="mb-5">
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="w-full h-10 px-4 rounded-lg border text-sm"
          style={{ borderColor: "var(--gray-200)", backgroundColor: "#F3F5F8", color: "var(--gray-800)" }}
        />
      </section>

      {/* 내용 */}
      <section className="mb-8">
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          className="w-full min-h-48 p-4 rounded-lg border text-sm"
          style={{ borderColor: "var(--gray-200)", backgroundColor: "#F3F5F8", color: "var(--gray-800)" }}
        />
      </section>

      {(error) && (
        <p className="text-error text-sm">처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      )}
    </div>
  );
}
