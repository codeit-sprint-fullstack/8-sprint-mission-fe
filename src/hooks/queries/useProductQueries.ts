import { useQuery } from '@tanstack/react-query';
import { getProductById, getProducts } from '@/services/product.service';

export const useGetProducts = (
  orderBy: 'recent' | 'like',
  q: string,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ['products', orderBy, q, page, limit],
    queryFn: () => getProducts(orderBy, q, page, limit),
  });
};

export const useGetBestProducts = () => {
  return useQuery({
    queryKey: ['bestProducts'],
    queryFn: () => getProducts('like', '', 1, 4),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });
};
