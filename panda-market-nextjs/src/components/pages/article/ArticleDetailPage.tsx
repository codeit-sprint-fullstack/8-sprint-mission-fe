"use client";

import BtnHeart from "@/components/atoms/BtnHeart";
import Text from "@/components/atoms/Text";
import BasicDropdown from "@/components/molecules/BasicDropdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useArticlesQuery } from "@/lib/api/articles/queries";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";

export default function ArticleDetailPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: articleDetail,
    isLoading,
    isError,
    error,
  }: UseQueryResult<any> = useArticlesQuery.useGetArticleDetail(id);

  const { mutate: deleteArticleMutation } = useArticlesQuery.useDeleteArticle();
  const handleDelete = () => {
    deleteArticleMutation(
      { id },
      {
        onSuccess: () => {
          queryClient.cancelQueries({ queryKey: ["articleDetail", id] });
          router.push("/article");
          console.log("게시글이 성공적으로 삭제되었습니다.");
        },
        onError: (error) => {
          console.error("게시글 삭제 중 오류가 발생했습니다:", error);
        },
      }
    );
  };

  const createdAt = dayjs(articleDetail?.createdAt).format("YYYY. MM. DD.");

  const handleUpdate = () => {
    router.push(`/article/${id}/edit`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <Text styleName="text-3xl-bold" className="mb-4" as="h1">
            {articleDetail?.title}
          </Text>
          <BasicDropdown
            id={id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
        <div className="flex items-center gap-8 border-b border-secondary-200 pb-4 mb-6">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage
                src={"/article/avatar-img.svg"}
                alt={articleDetail?.author}
                width={24}
                height={24}
              />
            </Avatar>
            <Text
              styleName="text-md-medium"
              className="ml-2 text-secondary-600"
            >
              {articleDetail?.author}
            </Text>
            <Text styleName="text-md-medium" className="text-secondary-400">
              {createdAt}
            </Text>
          </div>
          {/* 라인 */}
          <div className="w-px h-6 bg-secondary-200" />
          {/* 좋아요 버튼 */}
          <div>
            <BtnHeart initialLikeCount={articleDetail?.likes} />
          </div>
        </div>

        <Text styleName="text-2lg-regular" className="text-secondary-800">
          {articleDetail?.content}
        </Text>
      </section>
      <section>
        <Text styleName="text-lg-semibold" className="text-secondary-800 mb-2">
          댓글달기
        </Text>
        <Textarea
          className="bg-(--secondary-color-100) resize-none h-[104px] py-4 px-6 border-none"
          placeholder="댓글을 입력해주세요"
        />
      </section>
    </main>
  );
}
