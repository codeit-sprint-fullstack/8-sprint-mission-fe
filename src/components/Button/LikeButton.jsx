"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { likeService } from "@/lib/likeService";

const LikeButton = ({
  targetId,
  initialCount = 0,
  initialLiked = false,
  service,
  addMethod,
  removeMethod,
}) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //백엔드와 연동 후 수정 필요
  const handleClick = async () => {
    // setLiked((prev) => !prev);
    // setCount((prev) => (liked ? prev - 1 : prev + 1));
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      if (!liked) {
        await add(targetId);
        setLiked(true);
        setCount((prev) => prev + 1);
      } else {
        await remove(targetId);
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
