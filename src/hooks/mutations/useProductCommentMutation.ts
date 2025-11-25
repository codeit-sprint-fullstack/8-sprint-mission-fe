import { useMutation } from '@tanstack/react-query';
import {
  addProductComment,
  deleteProductComment,
  editProductComment,
} from '@/services/product.comment.service';

export const useAddProductComment = () => {
  return useMutation({
    mutationFn: addProductComment,
  });
};

export const useEditProductComment = () => {
  return useMutation({
    mutationFn: editProductComment,
  });
};

export const useDeleteProductComment = () => {
  return useMutation({
    mutationFn: deleteProductComment,
  });
};
