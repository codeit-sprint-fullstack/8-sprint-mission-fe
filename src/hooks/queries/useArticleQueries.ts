import { useQuery } from '@tanstack/react-query';
import { getArticles, getDetailArticle } from '@/services/article.service';

export const useGetArticles = (sort: 'recent' | 'likes', q: string) => {
  return useQuery({
    queryKey: ['articles', sort, q],
    queryFn: () => getArticles(sort, q),
  });
};

export const useGetDetailArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getDetailArticle(id),
  });
};
