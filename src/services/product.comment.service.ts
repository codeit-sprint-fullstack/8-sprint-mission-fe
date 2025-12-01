import api from '@/libs/api';

export const addProductComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const res = await api.post(`/product-comments/${productId}`, { content });
  return res.data;
};

export const getProductComments = async (id: string) => {
  const res = await api.get(`/product-comments/${id}`);
  return res.data;
};

export const editProductComment = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  const res = await api.patch(`/product-comments/${commentId}`, { content });
  return res.data;
};

export const deleteProductComment = async ({ commentId }: { commentId: string }) => {
  const res = await api.delete(`/product-comments/${commentId}`);
  return res.data;
};
