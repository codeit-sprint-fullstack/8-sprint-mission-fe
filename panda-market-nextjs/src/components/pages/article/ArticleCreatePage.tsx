"use client";

import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useArticlesQuery } from "@/lib/api/articles/queries";
import { articleSchema, ArticleSchema } from "@/lib/schema/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ArticleCreatePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-9">
          <Text styleName="text-xl-bold">게시글 쓰기</Text>
          <Button
            variant={isValid ? "default" : "disabled"}
            disabled={!isValid}
          >
            등록
          </Button>
        </div>

        {/* 제목 입력 필드 */}
        <div className="mb-6">
          <Text styleName="text-2lg-regular" className="mb-3">
            *제목
          </Text>
          <Input
            {...register("title")}
            name="title"
            placeholder="제목을 입력해주세요"
            className="bg-(--secondary-color-100) py-3 px-6 h-[auto]"
          />
          {errors.title && (
            <Text
              styleName="text-md-regular"
              className="text-(--error-color) mt-2"
            >
              {errors.title.message as string}
            </Text>
          )}
        </div>

        {/* 내용 입력 필드 */}
        <div>
          <Text styleName="text-2lg-regular" className="mb-3">
            *내용
          </Text>
          <Textarea
            {...register("content")}
            name="content"
            placeholder="내용을 입력해주세요"
            className="bg-(--secondary-color-100) resize-none h-[200px] md:h-[250px] lg:h-[282px] py-4 px-6"
          />
          {errors.content && (
            <Text
              styleName="text-md-regular"
              className="text-(--error-color) mt-2"
            >
              {errors.content.message as string}
            </Text>
          )}
        </div>
      </form>
    </div>
  );
}
