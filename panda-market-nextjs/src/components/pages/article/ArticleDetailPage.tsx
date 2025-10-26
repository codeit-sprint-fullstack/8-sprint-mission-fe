"use client";

import Text from "@/components/atoms/Text";
import BasicDropdown from "@/components/molecules/BasicDropdown";
import CommentList from "@/components/organisms/CommentList";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useArticlesQuery } from "@/lib/api/articles/queries";
import { useCommentsQuery } from "@/lib/api/comments/queries";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Article } from "@/lib/api/articles/fetchers";
import { Comment } from "@/lib/api/comments/fetchers";
import BtnHeart from "@/components/atoms/BtnHeart";

export default function ArticleDetailPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data: articleDetail,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Article> = useArticlesQuery.useGetArticleDetail(id);

  const { mutate: deleteArticleMutation } = useArticlesQuery.useDeleteArticle();
  const { mutate: createCommentMutation } = useCommentsQuery.useCreateComment();
  const { mutate: deleteCommentMutation } = useCommentsQuery.useDeleteComment();
  const { mutate: updateCommentMutation } = useCommentsQuery.useUpdateComment();

  console.log(articleDetail);
  /**
   * 게시글 삭제
   */
  const handleDelete = () => {
    deleteArticleMutation(
      { id },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          toast.success("게시글이 성공적으로 삭제되었습니다.");
          router.push("/article");
        },
        onError: () => {
          setIsDeleteDialogOpen(false);
          toast.error("게시글 삭제 중 오류가 발생했습니다.");
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

    if (comment === "") {
      toast("댓글을 입력해주세요", {
        action: {
          label: "확인",
          onClick: () => {
            setComment("");
          },
        },
      });

      return;
    }

    createCommentMutation(
      { id, comment },
      {
        onSuccess: () => {
          setComment("");
          queryClient.invalidateQueries({ queryKey: ["comments", id] });
          toast.success("댓글이 성공적으로 등록되었습니다.");
        },
        onError: () => {
          toast.error("댓글 등록 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const {
    data: articleComments,
    isLoading: isArticleCommentsLoading,
    isError: isArticleCommentsError,
    error: articleCommentsError,
  }: UseQueryResult<Comment[]> = useCommentsQuery.useGetComments(id);

  /**
   * 댓글 삭제
   */
  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation(
      { articleId: id, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["comments", id] });
          toast.success("댓글이 성공적으로 삭제되었습니다.");
        },
        onError: () => {
          toast.error("댓글 삭제 중 오류가 발생했습니다.");
        },
      }
    );
  };

  /**
   * 댓글 수정
   */
  const handleUpdateComment = (commentId: string, newContent: string) => {
    updateCommentMutation(
      { articleId: id, commentId, comment: newContent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["comments", id] });
          toast.success("댓글이 성공적으로 수정되었습니다.");
        },
        onError: () => {
          toast.error("댓글 수정 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <main>
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <Text styleName="text-3xl-bold" className="mb-4" as="h1">
            {articleDetail?.title}
          </Text>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <div>
                <BasicDropdown
                  onDelete={() => setIsDeleteDialogOpen(true)}
                  onUpdate={handleUpdate}
                />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수
                  없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex items-center gap-8 border-b border-secondary-200 pb-4 mb-6">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage
                src={"/article/avatar-img.svg"}
                alt={articleDetail?.user?.nickname || ""}
                width={24}
                height={24}
              />
            </Avatar>
            <Text
              styleName="text-md-medium"
              className="ml-2 text-secondary-600"
            >
              {articleDetail?.user?.nickname || ""}
            </Text>
            <Text styleName="text-md-medium" className="text-secondary-400">
              {createdAt}
            </Text>
          </div>
          {/* 라인 */}
          <div className="w-px h-6 bg-secondary-200" />
          {/* 좋아요 버튼 */}
          <div>
            <BtnHeart
              type="article"
              id={id}
              initialLikeCount={articleDetail?.likeCount || 0}
              isLiked={articleDetail?.isLiked || false}
            />
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
        <CommentList
          data={articleComments || []}
          isLoading={isArticleCommentsLoading}
          isError={isArticleCommentsError}
          error={
            articleCommentsError ||
            new Error("댓글 조회 중 오류가 발생했습니다.")
          }
          id={articleDetail?.id || ""}
          onDeleteComment={handleDeleteComment}
          onUpdateComment={handleUpdateComment}
        />

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
