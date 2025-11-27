import { useQuery } from '@tanstack/react-query';
import { getArticles, getDetailArticle } from '@/services/article.service';

export const useGetArticles = (sort: 'recent' | 'likes', searchQuery: string) => {
  return useQuery({
    queryKey: ['articles', sort, searchQuery],
    queryFn: () => getArticles(sort, searchQuery),
  });
};

export const useGetDetailArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getDetailArticle(id),
  });
};
