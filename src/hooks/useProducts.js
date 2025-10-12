import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/productApi';

export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};
