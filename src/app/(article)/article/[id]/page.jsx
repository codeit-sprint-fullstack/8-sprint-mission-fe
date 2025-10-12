import React from 'react';
import ArticleDetailPage from '@/components/pages/ArticleDetailPage';

export default function ArticleDetail({ params }) {
  const { id } = params || {};
  return <ArticleDetailPage articleId={id} />;
}
