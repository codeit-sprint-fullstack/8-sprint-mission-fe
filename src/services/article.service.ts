import api from '@/libs/api';

export const getArticles = async (sort: 'recent' | 'likes', q: string) => {
  const res = await api.get('/articles', { params: { sort: sort, q: q } });
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
