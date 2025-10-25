import { QueryClient } from "@tanstack/react-query";
import { itemsApi, ProductFilters } from "./fetchers";

/**
 * 상품 목록 prefetch
 */
export const prefetchProducts = async (
  queryClient: QueryClient,
  params: ProductFilters
) => {
  await queryClient.ensureQueryData({
    queryKey: ["products", params],
    queryFn: () => itemsApi.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 베스트 상품 prefetch
 */
export const prefetchBestProducts = async (queryClient: QueryClient) => {
  await queryClient.ensureQueryData({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const response = await itemsApi.getProducts({
        page: 1,
        pageSize: 4,
        orderBy: "like",
      });
      return response.products.sort((a, b) => b.likeCount - a.likeCount);
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 상품 상세 prefetch
 */
export const prefetchProductDetail = async (
  queryClient: QueryClient,
  id: string
) => {
  await queryClient.ensureQueryData({
    queryKey: ["productDetail", id],
    queryFn: () => itemsApi.getProductDetail(id),
    staleTime: 5 * 60 * 1000, // 5분
  });
};
