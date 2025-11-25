import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProducts } from '@/lib/productApi';
import { Product, ProductParams } from '@/types';

export const useProducts = (params: ProductParams = {}): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};
