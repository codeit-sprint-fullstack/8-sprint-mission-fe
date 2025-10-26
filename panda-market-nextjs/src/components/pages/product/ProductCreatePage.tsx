"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/molecules/ImageUpload";
import TagInput from "@/components/molecules/TagInput";
import { useItemsQuery } from "@/lib/api/product/queries";
import { productSchema, ProductSchema } from "@/lib/schema/product";
import { Spinner } from "@/components/ui/spinner";

export default function ProductCreatePage() {
  const router = useRouter();

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

  const { mutate: createProductMutation, isPending: isCreateProductPending } =
    useItemsQuery.useCreateProduct();

  // 폼 데이터 감시
  const watchedPrice = watch("price");

  /**
   * 상품 생성 제출
   * @param data 상품 데이터
   */
  const onSubmit = async (data: ProductSchema) => {
    createProductMutation(data, {
      onSuccess: (createdProduct) => {
        router.push(`/product/${createdProduct.id}`);
        toast.success("상품이 성공적으로 등록되었습니다.");
      },
      onError: (error) => {
        console.error("상품 생성 중 오류가 발생했습니다:", error);
        toast.error(error.message || "상품 생성 중 오류가 발생했습니다.");
      },
    });
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

  if (isCreateProductPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Text styleName="text-lg-medium">
          <Spinner /> 상품을 등록하는 중
        </Text>
      </div>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <Text styleName="text-2xl-bold" className="text-secondary-800">
            상품 등록하기
          </Text>
          <Button
            type="submit"
            variant={isValid ? "default" : "disabled"}
            disabled={!isValid || isCreateProductPending}
          >
            {isCreateProductPending ? "등록 중" : "등록"}
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
            onClick={() => router.push("/product")}
          >
            취소
          </Button>
        </div>
      </form>
    </main>
  );
}
