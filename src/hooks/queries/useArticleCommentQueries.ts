import { useQuery } from '@tanstack/react-query';
import { getArticleComments } from '@/services/article.comment.service';

export const useGetArticleComments = (articleId: string) => {
  return useQuery({
    queryKey: ['articleComments', articleId],
    queryFn: () => getArticleComments(articleId),
  });
};
