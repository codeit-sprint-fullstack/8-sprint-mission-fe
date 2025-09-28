"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DropdownMenu from "@/components/DropdownMenu";
import { useArticles } from "@/providers/ArticleProvider";

export default function ArticleDetailSection({ articleId }) {
  const { currentArticle, getArticleById, loading: articleLoading, error: articleError } = useArticles();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!articleId) return;
    getArticleById(articleId);
  }, [articleId]);

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
    <div>
      {/* 제목과 메타 */}
      <div className="mb-6 border-b pb-6" style={{ borderColor: 'var(--gray-200)' }}>
        {articleLoading && (
          <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />
        )}
        {!articleLoading && (
          <div className="flex items-center justify-between relative">
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
              {currentArticle?.title || "제목 없음"}
            </h1>
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1 rounded hover:bg-gray-50"
              >
                <Image src='/images/icon/ic_kebab.svg' alt="더보기" width={20} height={20}/>
              </button>
              <DropdownMenu open={menuOpen} onClose={() => setMenuOpen(false)} articleId={articleId} type="article" />
            </div>
          </div>
        )}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center text-sm gap-2" style={{ color: 'var(--gray-500)' }}>
            <Image src={currentArticle?.avatar || "/images/icon/ic_profile.svg"} alt="작성자" width={20} height={20} />
            <span>{currentArticle?.author || currentArticle?.nickname || "익명"}</span>
            <span>{createdAtText}</span>
          </div>
          
          <div className="text-sm pl-4 border-l" style={{ color: 'var(--gray-500)' }}>
            <div className="flex items-center justify-center gap-1 px-3 py-1 rounded-4xl border" style={{ borderColor: 'var(--gray-200)' }}>
              <Image src='/images/icon/ic_heart.svg' alt="좋아요" width={20} height={20} /> {(Number(currentArticle?.likes || 0)).toLocaleString()}
            </div>
          </div>
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
    </div>
  );
}
