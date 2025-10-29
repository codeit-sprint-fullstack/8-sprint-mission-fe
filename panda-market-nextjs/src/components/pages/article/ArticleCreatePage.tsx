"use client";

import React from "react";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/molecules/ImageUpload";
import { useArticlesQuery } from "@/lib/api/articles/queries";
import { articleSchema, ArticleSchema } from "@/lib/schema/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

export default function ArticleCreatePage() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const {
    mutate: createArticleMutation,
    isPending,
    isError,
    error,
  } = useArticlesQuery.useCreateArticle();

  /**
   * 게시글 작성
   * @param data 게시글 데이터
   */
  const onSubmit = async (data: ArticleSchema) => {
    createArticleMutation(data, {
      onSuccess: () => {
        router.push("/article");
        console.log("게시글이 성공적으로 작성되었습니다.");
      },
      onError: (error) => {
        console.error("게시글 작성 중 오류가 발생했습니다:", error);
      },
    });
  };

  if (isPending) {
    return <div>글 생성 중</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <Text styleName="text-2xl-bold" className="text-secondary-800">
            게시글 쓰기
          </Text>
          <Button
            variant={isValid ? "default" : "disabled"}
            disabled={!isValid || isPending}
          >
            {isPending ? "등록 중" : "등록"}
          </Button>
        </div>

        {/* 이미지 업로드 */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUpload
              images={field.value?.map((url) => ({ image: { url } })) || []}
              onImagesChange={field.onChange}
              maxImages={3}
              error={errors.images?.message}
              label="게시글 이미지"
            />
          )}
        />

        {/* 제목 입력 필드 */}
        <div className="space-y-3">
          <Text styleName="text-lg-semibold" className="text-secondary-800">
            *제목
          </Text>
          <Input
            {...register("title")}
            placeholder="제목을 입력해주세요"
            className="bg-secondary-100 py-3 px-6 h-[auto]"
          />
          {errors.title && (
            <Text styleName="text-md-regular" className="text-red-500">
              {errors.title.message}
            </Text>
          )}
        </div>

        {/* 내용 입력 필드 */}
        <div className="space-y-3">
          <Text styleName="text-lg-semibold" className="text-secondary-800">
            *내용
          </Text>
          <Textarea
            {...register("content")}
            placeholder="내용을 입력해주세요"
            className="bg-secondary-100 resize-none h-[200px] md:h-[250px] lg:h-[282px] py-4 px-6"
          />
          {errors.content && (
            <Text styleName="text-md-regular" className="text-red-500">
              {errors.content.message}
            </Text>
          )}
        </div>

        {/* 취소 버튼 */}
        <div className="flex justify-center pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/article")}
          >
            취소
          </Button>
        </div>
      </form>
    </main>
  );
}
