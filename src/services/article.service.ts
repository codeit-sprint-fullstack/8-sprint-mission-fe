import api from '@/libs/api';

export const getArticles = async (sort: 'recent' | 'likes', q: string) => {
  const res = await api.get('/articles', { params: { sort: sort, q: q } });
  return res.data;
};
