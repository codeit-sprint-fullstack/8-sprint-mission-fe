"use client";
import React from "react";

import KebabMenu from "@/app/(components)/atoms/KebabMenu";
import ProfileIcon from "@/app/(components)/atoms/ProfileIcon";
import Heart from "@/app/(components)/atoms/Heart";
import TextareaInput from "@/app/(components)/atoms/TextareaInput";
import CommentList from "./CommentList";
import ic_return from "/public/ic_arrow_return.svg";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteArticle, fetchArticle } from "@/api/fetchArticle";

const BoardDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: article,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    gcTime: 10 * 60 * 1000,
  });

  const queryClient = useQueryClient();
  const {
    mutate: mutateDeleteArticle,
    isPending: isDelete,
    error: deleteErr,
  } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("게시글 삭제 중 오류 발생: ", error);
      alert("게시글을 삭제하는데 실패했습니다.");
    },
  });

  const handleDelete = () => {
    mutateDeleteArticle(id);

    alert("게시글 삭제완료");
    router.push("/board");
  };

  const handlePatch = () => {
    router.push(`/board/${id}/patch`);
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  // 댓글 임시 데이터
  const commentTemp = [
    {
      id: 1,
      content: "혹시 사용기간이 어떻게 되실까요?",
      name: "똑똑한판다",
      time: "1시간 전",
    },
    {
      id: 2,
      content: "혹시 하자가 있나요?",
      name: "총명한판다",
      time: "2시간 전",
    },
    {
      id: 3,
      content: "혹시 사용기간이 어떻게 되실까요?",
      name: "똑똑한판다",
      time: "30분 전",
    },
  ];

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <p className="text-gray-800 text-xl/8 font-bold">{article.title}</p>
        <KebabMenu handlePatch={handlePatch} handleDelete={handleDelete} />
      </div>
      <div className="flex gap-8 items-center my-4 ">
        <div className="flex items-center gap-2 text-sm/6 font-normal">
          <ProfileIcon size="40" />
          <span className="text-gray-600 ml-2">총명한 판다</span>
          <span className="text-gray-400">2025. 06. 09</span>
        </div>
        <div className="w-0.25 h-8 bg-gray-200"></div>
        <div className="flex items-center h-10 px-3 border border-gray-200 rounded-[35px]">
          <Heart size="26" count="9999" fontSize="text-base" />
        </div>
      </div>
      <div className="w-full h-0.25 bg-gray-200"></div>
      <p className="w-full mt-6 mb-8">{article.content}</p>
      <TextareaInput name="comments" title="댓글달기" type="textarea" />
      <div className="mt-10">
        {commentTemp.map((comnt) => {
          return (
            <CommentList
              key={comnt.id}
              content={comnt.content}
              name={comnt.name}
              time={comnt.time}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-16">
        <Link
          href="/board"
          className="max-w-60 w-full h-12 flex gap-2 items-center rounded-4xl bg-Primary-100 px-10"
        >
          <p className="text-white text-lg font-semibold">목록으로 돌아가기</p>
          <Image src={ic_return} alt="return_icon" />
        </Link>
      </div>
    </section>
  );
};

export default BoardDetailPage;
