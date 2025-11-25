import React from 'react';
import ArticleDetailPage from '@/components/pages/ArticleDetailPage';

interface ArticleDetailProps {
  params: {
    id: string;
  };
}

export default function ArticleDetail({ params }: ArticleDetailProps) {
  const { id } = params || {};
  return <ArticleDetailPage articleId={Number(id)} />;
}
