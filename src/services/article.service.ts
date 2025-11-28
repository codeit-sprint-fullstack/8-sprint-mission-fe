import api from '@/libs/api';

export const getArticles = async (sort: 'recent' | 'like', searchQuery: string) => {
  const res = await api.get('/articles', { params: { sort, searchQuery } });
  return res.data;
};

export const getArticlesInfinityScroll = async ({
  sortOption,
  searchQuery,
  cursor,
  limit,
}: {
  sortOption: 'recent' | 'like';
  searchQuery: string;
  cursor: string | null;
  limit: number;
}) => {
  const res = await api.get('/articles', {
    params: { sort: sortOption, searchQuery, cursor, limit },
  });
  return res.data;
};

export const getBestArticles = async () => {
  const res = await api.get('/articles', { params: { sort: 'like', limit: 3 } });
  return res.data;
};

export const getDetailArticle = async (id: string) => {
  const res = await api.get(`/articles/${id}`);
  return res.data;
};

export const createArticle = async ({ title, content }: { title: string; content: string }) => {
  const res = await api.post('/articles', { title, content });
  return res.data;
};

export const updateArticle = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  const res = await api.patch(`/articles/${id}`, { title, content });
  return res.data;
};
