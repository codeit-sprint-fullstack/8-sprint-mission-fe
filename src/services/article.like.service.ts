import api from '@/libs/api';

export const likeArticle = async ({ articleId }: { articleId: string }) => {
  const res = await api.post(`/articles/${articleId}/like`);
  return res.data;
};

export const unlikeArticle = async ({ articleId }: { articleId: string }) => {
  const res = await api.delete(`/articles/${articleId}/like`);
  return res.data;
};
