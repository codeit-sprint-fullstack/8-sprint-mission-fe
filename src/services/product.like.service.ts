import api from '@/libs/api';

export const likeProduct = async ({ productId }: { productId: string }) => {
  const res = await api.post(`/products/${productId}/like`);
  return res.data;
};

export const unlikeProduct = async ({ productId }: { productId: string }) => {
  const res = await api.delete(`/products/${productId}/like`);
  return res.data;
};
