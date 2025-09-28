"use client";

import BtnHeart from "@/components/atoms/BtnHeart";
import Text from "@/components/atoms/Text";
import BasicDropdown from "@/components/molecules/BasicDropdown";
import CommentList from "@/components/organisms/CommentList";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useArticlesQuery } from "@/lib/api/articles/queries";
import { useCommentsQuery } from "@/lib/api/comments/queries";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticleDetailPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const {
    data: articleDetail,
    isLoading,
    isError,
    error,
  }: UseQueryResult<any> = useArticlesQuery.useGetArticleDetail(id);

  const { mutate: deleteArticleMutation } = useArticlesQuery.useDeleteArticle();
  const { mutate: createCommentMutation } = useCommentsQuery.useCreateComment();

  /**
   * 게시글 삭제
   */
  const handleDelete = () => {
    deleteArticleMutation(
      { id },
      {
        onSuccess: () => {
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

  /**
   * 게시글 수정
   */
  const handleUpdate = () => {
    router.push(`/article/${id}/edit`);
  };

  /**
   * 댓글 입력 값 변경 시 호출할 함수
   * @param e
   */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  /**
   * 댓글 등록 시 호출할 함수
   * @param e
   */
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCommentMutation(
      { id, comment },
      {
        onSuccess: () => {
          setComment("");
          queryClient.invalidateQueries({ queryKey: ["comments"] });
          console.log("댓글이 성공적으로 생성되었습니다.");
        },
        onError: (error) => {
          console.error("댓글 생성 중 오류가 발생했습니다:", error);
        },
      }
    );
  };

  if (isLoading) {
    return <div>글 상세 조회 중</div>;
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
          <BasicDropdown onDelete={handleDelete} onUpdate={handleUpdate} />
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
        <form onSubmit={handleCommentSubmit} className="mb-10">
          <Textarea
            className="bg-(--secondary-color-100) resize-none h-[104px] py-4 px-6 border-none"
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="flex justify-end mt-4">
            <Button
              variant={comment ? "default" : "disabled"}
              disabled={!comment}
            >
              등록
            </Button>
          </div>
        </form>

        {/* 댓글 리스트 */}
        <CommentList id={articleDetail?.id} />

        {/* 목록으로 돌아가기 */}
        <div className="flex justify-center mt-16">
          <Button variant="default" onClick={() => router.push("/article")}>
            목록으로 돌아가기
          </Button>
        </div>
      </section>
    </main>
  );
}
