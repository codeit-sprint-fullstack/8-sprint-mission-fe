import { useMutation } from '@tanstack/react-query';
import { createProduct } from '@/services/product.service';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
