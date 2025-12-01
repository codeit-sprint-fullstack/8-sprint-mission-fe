'use client';

import ArticleForm from '@/components/features/articles/ArticleForm';
import { useParams } from 'next/navigation';

const ArticleEditPage = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  return <ArticleForm articleId={id} />;
};

export default ArticleEditPage;
