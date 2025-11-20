import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/services/article.service';

export const useGetArticles = (sort: 'recent' | 'like', q: string) => {
  return useQuery({
    queryKey: ['articles', sort, q],
    queryFn: () => getArticles(sort, q),
  });
};
