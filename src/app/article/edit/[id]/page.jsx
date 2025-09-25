import ArticleFormClient from '@/components/ArticleFormClient';

const ArticleEditPage = ({ params }) => {
  return <ArticleFormClient id={params.id} />;
};

export default ArticleEditPage;
