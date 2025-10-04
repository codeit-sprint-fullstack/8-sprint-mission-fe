'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import ArticleDetailSection from '@/components/article/ArticleDetailSection';
import ArticleCommentSection from '@/components/article/ArticleCommentSection';

/**
 * ArticleDetailPage
 * - 게시글 상세 조회 + 댓글 목록/작성
 * - props.articleId: string
 */
export default function ArticleDetailPage({ articleId }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleDetailSection articleId={articleId} />
      <ArticleCommentSection articleId={articleId} />
      {/* 목록으로 돌아가기 */}
      <div className="flex justify-center">
        <Button as={Link} href="/article" appearance="primary">
          목록으로 돌아가기 ↩
        </Button>
      </div>
    </div>
  );
}
