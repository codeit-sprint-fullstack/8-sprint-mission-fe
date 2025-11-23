import api from '@/libs/api';

export const getProducts = async (
  orderBy: 'recent' | 'like',
  q: string,
  page: number = 1,
  limit: number = 10,
) => {
  const res = await api.get('/products', { params: { sort: orderBy, q, page, limit } });
  return res.data;
};
