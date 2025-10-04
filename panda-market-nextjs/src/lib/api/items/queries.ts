"use client";

import {
  Product,
  itemsApi,
  ProductList,
  ProductFilters,
} from "@/lib/api/items/fetchers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

/**
 * 베스트 상품 조회 (favoriteCount 내림차순으로 3개)
 * @returns Product[]
 */
const useGetBestProducts = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const response = await itemsApi.getProducts({
        page: 1,
        pageSize: 4,
        orderBy: "favorite",
      });
      // favoriteCount 내림차순으로 정렬하여 반환
      return response.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
    },
  });
};

/**
 * 상품 조회
 * @param params ProductFilters
 * @returns ProductList
 */
const useGetProducts = (
  params: ProductFilters
): UseQueryResult<ProductList> => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => itemsApi.getProducts(params),
  });
};

/**
 * 상품 상세 조회
 * @param id 상품 ID
 * @returns Product
 */
const useGetProductDetail = (id: number): UseQueryResult<Product> => {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => itemsApi.getProductDetail(id.toString()),
  });
};

export const useItemsQuery = {
  useGetBestProducts,
  useGetProducts,
  useGetProductDetail,
};
