"use client";

interface LikeButtonProps {
  likeCount?: number;
  isLiked?: boolean;
}

export function LikeButton({
  likeCount = 0,
  isLiked = false,
}: LikeButtonProps) {
  return (
    <button className="flex items-center gap-1 mt-1">
      <img
        src={
          isLiked
            ? "/product-list/like-icon-filled.svg"
            : "/product-list/like-icon.svg"
        }
        alt="좋아요"
        width={16}
        height={16}
      />
      <span className="text-sm text-secondary-400">{likeCount}</span>
    </button>
  );
}
