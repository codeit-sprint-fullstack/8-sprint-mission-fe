import api from '@/libs/api';

export const getArticleComments = async (articleId: string) => {
  const res = await api.get(`/article-comments/${articleId}`);
  return res.data;
};

export const editArticleComment = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  const res = await api.patch(`/article-comments/${commentId}`, { content });
  return res.data;
};

export const deleteArticleComment = async ({ commentId }: { commentId: string }) => {
  const res = await api.delete(`/article-comments/${commentId}`);
  return res.data;
};

export const addArticleComment = async ({
  articleId,
  content,
}: {
  articleId: string;
  content: string;
}) => {
  const res = await api.post(`/article-comments/${articleId}`, { content });
  return res.data;
};
