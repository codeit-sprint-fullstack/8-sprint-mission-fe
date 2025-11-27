import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getArticles,
  getArticlesInfinityScroll,
  getDetailArticle,
} from '@/services/article.service';

export const useGetArticles = (sort: 'recent' | 'likes', searchQuery: string) => {
  return useQuery({
    queryKey: ['articles', sort, searchQuery],
    queryFn: () => getArticles(sort, searchQuery),
  });
};

export const useGetArticleInfinityScroll = ({
  sort = 'recent',
  searchQuery = '',
  limit = 15,
}: {
  sort: 'recent' | 'likes';
  searchQuery: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', sort, searchQuery, limit],
    queryFn: ({ pageParam = 1 }) =>
      getArticlesInfinityScroll({ sort, searchQuery, page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNextPage ? lastPage.pagination.currentPage + 1 : undefined;
    },
  });
};

export const useGetDetailArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getDetailArticle(id),
  });
};
