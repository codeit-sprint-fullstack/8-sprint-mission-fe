import React from "react";

import KebabMenu from "@/app/(components)/atoms/KebabMenu";
import ProfileIcon from "@/app/(components)/atoms/ProfileIcon";
import Heart from "@/app/(components)/atoms/Heart";
import TextareaInput from "@/app/(components)/atoms/TextareaInput";
import CommentList from "./CommentList";
import ic_return from "/public/ic_arrow_return.svg";
import Link from "next/link";
import Image from "next/image";

const BoardDetailPage = () => {
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
        <p className="text-gray-800 text-xl/8 font-bold">맥북 어쩌구 title</p>
        <KebabMenu />
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
      <p className="w-full mt-6 mb-8">
        맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
      </p>
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
