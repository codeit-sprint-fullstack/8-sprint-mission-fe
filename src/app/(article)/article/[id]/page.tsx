import ArticleDetailPage from '@/components/pages/ArticleDetailPage';


interface ArticleDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { id } = await params;
  return <ArticleDetailPage articleId={id} />;
}
