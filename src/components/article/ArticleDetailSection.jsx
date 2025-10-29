'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DropdownMenu from '@/components/DropdownMenu';
import FavoriteButton from '@/components/product/FavoriteButton';
import { useArticles } from '@/providers/ArticleProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function ArticleDetailSection({ articleId }) {
  const {
    currentArticle,
    getArticleById,
    toggleArticleFavorite,
    loading: articleLoading,
    error: articleError,
  } = useArticles();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (!articleId) return;
    getArticleById(articleId).catch((e) => console.error('상세 로드 실패', e));
  }, [articleId, getArticleById]);

  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return '';
    try {
      return new Date(createdAt).toLocaleDateString();
    } catch {
      return String(createdAt);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    const result = await toggleArticleFavorite(articleId);
    return result;
  };

  return (
    <div>
      {/* 제목과 메타 */}
      <div className="mb-6 border-b pb-6" style={{ borderColor: 'var(--gray-200)' }}>
        {articleLoading && <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />}
        {!articleLoading && (
          <div className="flex items-center justify-between relative">
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
              {currentArticle?.title || '제목 없음'}
            </h1>
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1 rounded hover:bg-gray-50"
              >
                <Image src="/images/icon/ic_kebab.svg" alt="더보기" width={20} height={20} />
              </button>
              <DropdownMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                articleId={articleId}
                type="article"
              />
            </div>
          </div>
        )}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center text-sm gap-2" style={{ color: 'var(--gray-500)' }}>
            <Image
              src={currentArticle?.avatar || '/images/icon/ic_profile.svg'}
              alt="작성자"
              width={20}
              height={20}
            />
            <span>{currentArticle?.author || currentArticle?.nickname || '익명'}</span>
            <span>{formatCreatedAt(currentArticle?.createdAt)}</span>
          </div>

          <div className="text-sm pl-4 border-l" style={{ color: 'var(--gray-500)' }}>
            <FavoriteButton
              isLiked={currentArticle?.isLiked || false}
              count={currentArticle?.likes || currentArticle?.favoriteCount || 0}
              disabled={!isLoggedIn}
              onToggle={handleFavoriteToggle}
            />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mb-10 whitespace-pre-wrap leading-7" style={{ color: 'var(--gray-800)' }}>
        {articleError && <p className="text-error mb-4">게시글을 불러오지 못했습니다.</p>}
        {currentArticle?.image && (
          <div
            className="mb-6 w-full rounded-lg overflow-hidden border"
            style={{ borderColor: 'var(--gray-100)' }}
          >
            <Image
              src={currentArticle.image}
              alt={currentArticle.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {currentArticle?.content || <p className="text-gray-500">내용이 없습니다.</p>}
      </div>
    </div>
  );
}
