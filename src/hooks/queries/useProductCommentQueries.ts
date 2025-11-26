import { useQuery } from '@tanstack/react-query';
import { getProductComments } from '@/services/product.comment.service';

export const useGetProductComments = (id: string) => {
  return useQuery({
    queryKey: ['productComments', id],
    queryFn: () => getProductComments(id),
  });
};
