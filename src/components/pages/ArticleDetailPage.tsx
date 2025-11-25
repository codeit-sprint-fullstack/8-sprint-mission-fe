'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import ArticleDetailSection from '@/components/article/ArticleDetailSection';
import ArticleCommentSection from '@/components/article/ArticleCommentSection';

interface ArticleDetailPageProps {
  articleId: number;
}

export default function ArticleDetailPage({ articleId }: ArticleDetailPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleDetailSection articleId={articleId} />
      <ArticleCommentSection articleId={articleId} />
      <div className="flex justify-center">
        <Button as={Link} href="/article" appearance="primary">
          목록으로 돌아가기 ↩
        </Button>
      </div>
    </div>
  );
}
