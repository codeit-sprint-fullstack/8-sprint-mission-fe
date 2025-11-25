import { useMutation } from '@tanstack/react-query';
import { createProduct, editProduct } from '@/services/product.service';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};

export const useEditProduct = () => {
  return useMutation({
    mutationFn: editProduct,
  });
};
