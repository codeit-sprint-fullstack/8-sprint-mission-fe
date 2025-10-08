"use client";

import {
  Product,
  itemsApi,
  ProductList,
  ProductFilters,
} from "@/lib/api/items/fetchers";
import { ProductSchema } from "@/lib/schema/product";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

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

/**
 * 상품 수정
 * @returns UseMutationResult
 */
const useUpdateProduct = (): UseMutationResult<
  Product,
  Error,
  { id: string; product: ProductSchema }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductSchema }) =>
      itemsApi.updateProduct(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["productDetail", Number(id)],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["bestProducts"] });
    },
    onError: (error) => {
      console.error("상품 수정 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 상품 삭제
 * @returns UseMutationResult
 */
const useDeleteProduct = (): UseMutationResult<Product, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => itemsApi.deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["productDetail", Number(id)],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["bestProducts"] });
    },
    onError: (error) => {
      console.error("상품 삭제 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 상품 생성
 * @returns UseMutationResult
 */
const useCreateProduct = (): UseMutationResult<
  Product,
  Error,
  ProductSchema
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductSchema) => itemsApi.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["bestProducts"] });
    },
    onError: (error) => {
      console.error("상품 생성 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 상품 좋아요 추가
 * @returns UseMutationResult
 */
const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => itemsApi.addFavorite(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: ["productDetail", productId],
      });

      const previousProduct = queryClient.getQueryData<Product>([
        "productDetail",
        productId,
      ]);

      await queryClient.setQueryData(
        ["productDetail", productId],
        (old: Product) => ({
          ...old,
          isFavorite: true,
          favoriteCount: old.favoriteCount + 1,
        })
      );

      return { previousProduct };
    },
    onSettled: (_, __, productId) => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
    },
    onError: (error, productId, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ["productDetail", productId],
          context.previousProduct
        );
      }
      console.error("상품 좋아요 추가 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 상품 좋아요 삭제
 * @returns UseMutationResult
 */
const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => itemsApi.deleteFavorite(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: ["productDetail", productId],
      });

      const previousProduct = queryClient.getQueryData<Product>([
        "productDetail",
        productId,
      ]);

      await queryClient.setQueryData(
        ["productDetail", productId],
        (old: Product) => ({
          ...old,
          isFavorite: false,
          favoriteCount: old.favoriteCount - 1,
        })
      );

      return { previousProduct };
    },
    onSettled: (_, __, productId) => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
    },
    onError: (error, productId, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ["productDetail", productId],
          context.previousProduct
        );
      }
      console.error("상품 좋아요 삭제 중 오류가 발생했습니다:", error);
    },
  });
};

export const useItemsQuery = {
  useGetBestProducts,
  useGetProducts,
  useGetProductDetail,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useAddFavorite,
  useDeleteFavorite,
};
