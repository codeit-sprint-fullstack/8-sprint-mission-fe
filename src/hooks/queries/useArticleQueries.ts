import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getArticles,
  getArticlesInfinityScroll,
  getBestArticles,
  getDetailArticle,
} from '@/services/article.service';

export const useGetArticles = (sortOption: 'recent' | 'like', searchQuery: string) => {
  return useQuery({
    queryKey: ['articles', sortOption, searchQuery],
    queryFn: () => getArticles(sortOption, searchQuery),
  });
};

export const useGetArticleInfinityScroll = ({
  sortOption = 'recent',
  searchQuery = '',
  limit = 15,
}: {
  sortOption: 'recent' | 'like';
  searchQuery: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', sortOption, searchQuery, limit],
    queryFn: ({ pageParam = 1 }) =>
      getArticlesInfinityScroll({ sortOption, searchQuery, page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNextPage ? lastPage.pagination.currentPage + 1 : undefined;
    },
  });
};

export const useGetBestArticles = () => {
  return useQuery({
    queryKey: ['bestArticles'],
    queryFn: () => getBestArticles(),
  });
};

export const useGetDetailArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getDetailArticle(id),
  });
};
