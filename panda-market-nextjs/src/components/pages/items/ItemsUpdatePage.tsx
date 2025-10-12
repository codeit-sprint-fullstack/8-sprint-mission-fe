"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";

import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/molecules/ImageUpload";
import TagInput from "@/components/molecules/TagInput";
import { Product } from "@/lib/api/items/fetchers";
import { useItemsQuery } from "@/lib/api/items/queries";
import { productSchema, ProductSchema } from "@/lib/schema/product";

export default function ItemsUpdatePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    data: productDetail,
    isLoading: isProductDetailLoading,
    isError: isProductDetailError,
    error: productDetailError,
  }: UseQueryResult<Product> = useItemsQuery.useGetProductDetail(Number(id));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      tags: [],
      images: [],
    },
  });

  const { mutate: updateProductMutation, isPending: isUpdateProductPending } =
    useItemsQuery.useUpdateProduct();

  // 폼 데이터 감시
  const watchedPrice = watch("price");

  /**
   * 상품 수정 제출
   * @param data 상품 데이터
   */
  const onSubmit = async (data: ProductSchema) => {
    updateProductMutation(
      { id, product: data },
      {
        onSuccess: () => {
          router.push(`/items/${id}`);
          toast.success("상품이 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
          console.error("상품 수정 중 오류가 발생했습니다:", error);
          toast.error(error.message || "상품 수정 중 오류가 발생했습니다.");
        },
      }
    );
  };

  /**
   * 가격 입력 포맷팅
   * @param e 이벤트
   */
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = value ? parseInt(value, 10) : 0;
    setValue("price", numericValue, { shouldValidate: true });
  };

  /**
   * 상품 데이터 로드 후 폼에 설정
   */
  useEffect(() => {
    if (productDetail) {
      setValue("name", productDetail.name);
      setValue("description", productDetail.description);
      setValue("price", productDetail.price);
      setValue("tags", productDetail.tags || []);
      setValue("images", productDetail.images || []);
    }
  }, [productDetail, setValue]);

  if (isProductDetailLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Text styleName="text-lg-medium">상품 정보를 불러오는 중...</Text>
      </div>
    );
  }

  if (isProductDetailError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <Text styleName="text-lg-medium" className="text-red-500">
          상품 정보를 불러오는 중 오류가 발생했습니다.
        </Text>
        <Text styleName="text-md-regular" className="text-secondary-600">
          {productDetailError?.message}
        </Text>
        <Button onClick={() => router.push("/items")} variant="outline">
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  if (isUpdateProductPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Text styleName="text-lg-medium">상품을 수정하는 중...</Text>
      </div>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <Text styleName="text-2xl-bold" className="text-secondary-800">
            상품 수정하기
          </Text>
          <Button
            type="submit"
            variant={isValid ? "default" : "disabled"}
            disabled={!isValid || isUpdateProductPending}
          >
            {isUpdateProductPending ? "수정 중..." : "수정하기"}
          </Button>
        </div>

        {/* 이미지 업로드 */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUpload
              images={field.value}
              onImagesChange={field.onChange}
              error={errors.images?.message}
            />
          )}
        />

        {/* 상품명 */}
        <div className="space-y-3">
          <Text styleName="text-lg-semibold" className="text-secondary-800">
            상품명
          </Text>
          <Input
            {...register("name")}
            placeholder="상품명을 입력해주세요"
            className="bg-secondary-100 py-3 px-6 h-[auto]"
          />
          {errors.name && (
            <Text styleName="text-md-regular" className="text-red-500">
              {errors.name.message}
            </Text>
          )}
        </div>

        {/* 상품 설명 */}
        <div className="space-y-3">
          <Text styleName="text-lg-semibold" className="text-secondary-800">
            상품 소개
          </Text>
          <Textarea
            {...register("description")}
            placeholder="상품 소개를 입력해주세요"
            className="bg-secondary-100 resize-none h-[200px] py-4 px-6"
          />
          {errors.description && (
            <Text styleName="text-md-regular" className="text-red-500">
              {errors.description.message}
            </Text>
          )}
        </div>

        {/* 판매가격 */}
        <div className="space-y-3">
          <Text styleName="text-lg-semibold" className="text-secondary-800">
            판매가격
          </Text>
          <Input
            type="text"
            value={watchedPrice ? watchedPrice.toLocaleString() : ""}
            onChange={handlePriceChange}
            placeholder="판매가격을 입력해주세요"
            className="bg-secondary-100 py-3 px-6 h-[auto]"
          />
          {errors.price && (
            <Text styleName="text-md-regular" className="text-red-500">
              {errors.price.message}
            </Text>
          )}
        </div>

        {/* 태그 */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              tags={field.value}
              onTagsChange={field.onChange}
              error={errors.tags?.message}
            />
          )}
        />

        {/* 취소 버튼 */}
        <div className="flex justify-center pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/items/${id}`)}
          >
            취소
          </Button>
        </div>
      </form>
    </main>
  );
}
