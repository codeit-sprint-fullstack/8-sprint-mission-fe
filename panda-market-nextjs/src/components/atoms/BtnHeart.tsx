"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useItemsQuery } from "@/lib/api/product/queries";
import { useArticlesQuery } from "@/lib/api/articles/queries";

/**
 * 하트(좋아요) 버튼 컴포넌트
 * @param type - "product" | "article"
 * @param id - 상품/게시글 ID
 * @param initialLikeCount - 초기 좋아요 수
 * @param isLiked - 유저가 좋아요 했는지 여부
 */
interface BtnHeartProps {
  type: "product" | "article";
  id: string;
  initialLikeCount: number;
  isLiked: boolean;
}

export default function BtnHeart({
  type,
  id,
  initialLikeCount,
  isLiked,
}: BtnHeartProps) {
  // 좋아요 수 및 좋아요 여부 상태
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [liked, setLiked] = useState<boolean>(isLiked);

  // 상품/게시글 좋아요 토글 뮤테이션
  const { mutate: addProductFavorite, isPending: isProductPending } =
    useItemsQuery.useAddFavorite();
  const { mutate: deleteProductFavorite } = useItemsQuery.useDeleteFavorite();
  const { mutate: toggleArticleLike, isPending: isArticlePending } =
    useArticlesQuery.useToggleArticleLike();

  // 외부 prop 변경 시 내부 상태 동기화
  useEffect(() => {
    setLikeCount(initialLikeCount);
    setLiked(isLiked);
  }, [initialLikeCount, isLiked]);

  // 하트 아이콘 경로
  const heartIcon: string = liked
    ? "/product-list/like-icon-filled.svg"
    : "/product-list/like-icon.svg";

  /**
   * 좋아요 버튼 클릭 핸들러
   */
  const handleClick = () => {
    if (type === "product") {
      if (liked) {
        deleteProductFavorite(id, {
          onSuccess: (data) => {
            setLiked(false);
            setLikeCount(data.likeCount ?? (likeCount > 0 ? likeCount - 1 : 0));
          },
        });
      } else {
        addProductFavorite(id, {
          onSuccess: (data) => {
            setLiked(true);
            setLikeCount(data.likeCount ?? likeCount + 1);
          },
        });
      }
    } else {
      // article
      toggleArticleLike(id, {
        onSuccess: (data) => {
          setLiked(data.isLiked ?? false);
          setLikeCount(data.likeCount ?? 0);
        },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer border border-secondary-400 rounded-[40px] px-3 py-1 hover:border-secondary-600 transition-colors"
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      disabled={isProductPending || isArticlePending}
    >
      <Image
        src={heartIcon}
        alt={liked ? "좋아요 취소" : "좋아요"}
        width={24}
        height={24}
        priority
      />
      <span className="text-sm text-secondary-800">{likeCount}</span>
    </button>
  );
}
