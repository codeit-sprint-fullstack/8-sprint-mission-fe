"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLikeService } from "@/api/likeService";
import type { LikeButtonProps } from "@/types/controller";

const LikeButton = ({
  targetId,
  initialCount = 0,
  addMethod,
  removeMethod,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialCount);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      if (!liked) {
        if (addMethod) await addMethod(targetId);
        setLiked(true);
        setCount((prev) => prev + 1);
      } else {
        if (removeMethod) await removeMethod(targetId);
        setLiked(false);
        setCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex flex-col gap-[10px] h-10 ml-4 px-3 py-1 bg-white border border-gray-200 rounded-[35px]"
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <Image
          src={liked ? "/ic_fullheart.svg" : "/ic_heart.svg"}
          alt="Heart"
          width={32}
          height={32}
        />
        <p className="text-base font-medium text-gray-500 leading-[26px]">
          {count}
        </p>
      </div>
    </button>
  );
};

export default LikeButton;
