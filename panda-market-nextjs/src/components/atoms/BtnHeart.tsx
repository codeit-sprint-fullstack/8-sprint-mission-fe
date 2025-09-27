import Image from "next/image";
import { useState } from "react";

interface BtnHeartProps {
  initialLikeCount: number;
}

export default function BtnHeart({ initialLikeCount }: BtnHeartProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const icon = isLiked
    ? "/product-list/like-icon-filled.svg"
    : "/product-list/like-icon.svg";

  const handleClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(likeCount + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer border border-secondary-400 rounded-[40px] px-3 py-1"
    >
      <Image src={icon} alt="like" width={24} height={24} />
      <span>{likeCount}</span>
    </button>
  );
}
