"use client";

import BtnHeart from "@/components/atoms/BtnHeart";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthQuery } from "@/lib/api/auth/queries";
import { useCommentsQuery } from "@/lib/api/comments/queries";
import { Product } from "@/lib/api/product/fetchers";
import { useItemsQuery } from "@/lib/api/product/queries";
import { UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data: productDetail,
    isPending,
    isError,
    error,
  }: UseQueryResult<Product> = useItemsQuery.useGetProductDetail(id); // 상품 상세 조회

  const {
    data: productComments,
    isPending: isProductCommentsPending,
    isError: isProductCommentsError,
    error: productCommentsError,
  } = useCommentsQuery.useGetProductComments(id); // 상품 댓글 조회

  const { mutate: createProductCommentMutation } =
    useCommentsQuery.useCreateProductComment(); // 상품 댓글 생성
  const { mutate: updateProductCommentMutation } =
    useCommentsQuery.useUpdateProductComment(); // 상품 댓글 수정
  const { mutate: deleteProductCommentMutation } =
    useCommentsQuery.useDeleteProductComment(); // 상품 댓글 삭제

  const { mutate: deleteProductMutation } = useItemsQuery.useDeleteProduct(); // 상품 삭제
  const { data: user } = useAuthQuery.useGetUser(); // 사용자 정보 조회
  /**
   * 상품 삭제
   */
  const handleDelete = () => {
    deleteProductMutation(id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        toast.success("상품이 성공적으로 삭제되었습니다.");
        router.push("/product");
      },
      onError: (error) => {
        setIsDeleteDialogOpen(false);
        toast.error(error.message);
      },
    });
  };
  /**
   * 상품 수정
   */
  const handleUpdate = () => {
    router.push(`/product/${id}/edit`);
  };

  /**
   * 댓글 입력 값 변경 시 호출할 함수
   * @param e textarea 값
   */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  /**
   * 댓글 등록 시 호출할 함수
   * @param e form 전송 이벤트
   */
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment === "") {
      toast.error("댓글을 입력해주세요");
      return;
    }

    createProductCommentMutation(
      { id, comment },
      {
        onSuccess: () => {
          setComment("");
          toast.success("댓글이 성공적으로 등록되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );

    setComment("");
  };

  /**
   * 상품 댓글 삭제
   * @param commentId 댓글 ID
   */
  const handleDeleteProductComment = (commentId: string) => {
    deleteProductCommentMutation(
      { id, commentId },
      {
        onSuccess: () => {
          toast.success("댓글이 성공적으로 삭제되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  /**
   * 상품 댓글 수정
   * @param commentId 댓글 ID
   * @param comment 댓글 내용
   */
  const handleUpdateProductComment = (commentId: string, comment: string) => {
    updateProductCommentMutation(
      { id, commentId, comment },
      {
        onSuccess: () => {
          toast.success("댓글이 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (isPending) {
    return <div>상품 상세 조회 중...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const createdAt = dayjs(productDetail?.createdAt).format("YYYY. MM. DD.");
  const formattedPrice = productDetail?.price?.toLocaleString();
  const authorNickname = productDetail?.user?.nickname || user?.nickname;
  const authorImage = productDetail?.user?.image || "/article/avatar-img.svg";

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* 상품 이미지 */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary-100">
            <Image
              src={productDetail?.images?.[0] || "/product-list/prod-test.png"}
              alt={productDetail?.name}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.src = "/product-list/prod-test.png";
              }}
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col">
            {/* 상품명과 드롭다운 */}
            <div className="flex justify-between items-start mb-4">
              <Text styleName="text-2xl-regular" as="h1">
                {productDetail?.name}
              </Text>
              <BasicDropdown
                onDelete={() => setIsDeleteDialogOpen(true)}
                onUpdate={handleUpdate}
              />
            </div>

            {/* 삭제 확인 AlertDialog */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent className="py-12 max-w-[300px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    정말로 상품을 삭제하시겠어요?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 가격 */}
            <Text styleName="text-3xl-semibold" className="mb-6">
              {formattedPrice}원
            </Text>

            {/* 상품 소개 섹션 */}
            <div className="mb-6">
              <Text
                styleName="text-lg-semibold"
                className="text-secondary-800 mb-4 border-t border-secondary-200 pt-6"
              >
                상품 소개
              </Text>
              <Text
                styleName="text-md-regular"
                className="text-secondary-600 whitespace-pre-wrap"
              >
                {productDetail?.description}
              </Text>
            </div>

            {/* 상품 태그 섹션 */}
            <div className="mb-6">
              <Text
                styleName="text-lg-semibold"
                className="text-secondary-800 mb-4"
              >
                상품 태그
              </Text>
              <div className="flex flex-wrap gap-2">
                {productDetail?.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-secondary-100 rounded-full text-sm text-secondary-600"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 작성자 정보와 좋아요 */}
            <div className="flex items-center gap-4 pt-6 ">
              <div className="flex items-center gap-2">
                <Avatar className="rounded-lg w-10 h-10">
                  <AvatarImage src={authorImage} alt={authorNickname} />
                </Avatar>
                <div>
                  <Text
                    styleName="text-md-semibold"
                    className="text-secondary-800"
                  >
                    {authorNickname}
                  </Text>
                  <Text
                    styleName="text-xs-regular"
                    className="text-secondary-400"
                  >
                    {createdAt}
                  </Text>
                </div>
              </div>
              <div className="ml-auto">
                <BtnHeart
                  type="product"
                  id={productDetail?.id?.toString()}
                  initialLikeCount={productDetail?.likeCount || 0}
                  isLiked={productDetail?.isLiked || false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 문의하기 섹션 */}
      <section className="border-t border-secondary-200 pt-8">
        <Text styleName="text-lg-semibold" className="text-secondary-800 mb-4">
          문의하기
        </Text>
        <form onSubmit={handleCommentSubmit} className="mb-10">
          <Textarea
            className="bg-secondary-100 resize-none h-[104px] py-4 px-6 border-none"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
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

        {/* 댓글 리스트 영역 */}
        <div className="mb-8">
          <CommentList
            data={productComments || []}
            isLoading={isProductCommentsPending}
            isError={isProductCommentsError}
            error={
              productCommentsError ||
              new Error("댓글 조회 중 오류가 발생했습니다.")
            }
            id={id}
            onDeleteComment={handleDeleteProductComment}
            onUpdateComment={handleUpdateProductComment}
          />
        </div>

        {/* 목록으로 돌아가기 */}
        <div className="flex justify-center mt-16">
          <Button variant="default" onClick={() => router.push("/product")}>
            목록으로 돌아가기
          </Button>
        </div>
      </section>
    </main>
  );
}
