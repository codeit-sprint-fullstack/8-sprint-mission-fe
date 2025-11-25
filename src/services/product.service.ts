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

export const createProduct = async ({
  name,
  description,
  price,
  tags,
}: {
  name: string;
  description: string;
  price: number;
  tags?: string[];
}) => {
  const res = await api.post('/products', { name, description, price, tags });
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
