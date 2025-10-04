"use client";

import BtnHeart from "@/components/atoms/BtnHeart";
import Text from "@/components/atoms/Text";
import BasicDropdown from "@/components/molecules/BasicDropdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/api/items/fetchers";
import { useItemsQuery } from "@/lib/api/items/queries";
import { UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemsDetailPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const [comment, setComment] = useState("");

  const {
    data: productDetail,
    isPending,
    isError,
    error,
  }: UseQueryResult<Product> = useItemsQuery.useGetProductDetail(Number(id));

  /**
   * 상품 삭제
   */
  const handleDelete = () => {
    // TODO: 삭제 API 구현 필요
    console.log("상품 삭제");
    router.push("/items");
  };

  /**
   * 상품 수정
   */
  const handleUpdate = () => {
    router.push(`/items/${id}/edit`);
  };

  /**
   * 댓글 입력 값 변경 시 호출할 함수
   */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  /**
   * 댓글 등록 시 호출할 함수
   */
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 댓글 등록 API 구현 필요
    console.log("댓글 등록:", comment);
    setComment("");
  };

  if (isPending) {
    return <div>상품 상세 조회 중...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const createdAt = dayjs(productDetail?.createdAt).format("YYYY. MM. DD.");
  const formattedPrice = productDetail?.price.toLocaleString();

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 상품 이미지 */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary-100">
            <Image
              src={productDetail?.images?.[0] || "/product-list/prod-test.png"}
              alt={productDetail?.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col">
            {/* 상품명과 드롭다운 */}
            <div className="flex justify-between items-start mb-4">
              <Text styleName="text-2xl-bold" as="h1">
                {productDetail?.name}
              </Text>
              <BasicDropdown onDelete={handleDelete} onUpdate={handleUpdate} />
            </div>

            {/* 가격 */}
            <Text styleName="text-3xl-bold" className="mb-6">
              {formattedPrice}원
            </Text>

            {/* 상품 소개 섹션 */}
            <div className="mb-6">
              <Text
                styleName="text-lg-semibold"
                className="text-secondary-800 mb-4"
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
                {productDetail?.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary-100 rounded-full text-sm text-secondary-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 작성자 정보와 좋아요 */}
            <div className="flex items-center gap-4 pt-6 border-t border-secondary-200">
              <div className="flex items-center gap-2">
                <Avatar className="rounded-lg w-10 h-10">
                  <AvatarImage
                    src={"/article/avatar-img.svg"}
                    alt={productDetail?.name}
                  />
                </Avatar>
                <div>
                  <Text
                    styleName="text-md-semibold"
                    className="text-secondary-800"
                  >
                    {productDetail?.name}
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
                  initialLikeCount={productDetail?.favoriteCount || 0}
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
          <Text styleName="text-md-medium" className="text-secondary-600 mb-4">
            톡톡 사용자라면 이메게 되었나요?
          </Text>
          {/* TODO: 댓글 리스트 컴포넌트 추가 */}
          <div className="flex flex-col items-center justify-center py-16">
            <Image
              src="/article/reply-empty.svg"
              alt="댓글 없음"
              width={140}
              height={140}
              className="mb-4"
            />
            <Text styleName="text-lg-regular" className="text-secondary-400">
              아직 문의가 없습니다
            </Text>
          </div>
        </div>

        {/* 목록으로 돌아가기 */}
        <div className="flex justify-center mt-16">
          <Button variant="default" onClick={() => router.push("/items")}>
            목록으로 돌아가기
          </Button>
        </div>
      </section>
    </main>
  );
}
