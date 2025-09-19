import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardId from "@/components/Board/BoardId";
import Comment from "@/components/Comment";

const freeboardIdPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <BoardId />

        <form className="flex flex-col items-end gap-4 mb-10">
          <div className="flex flex-col justify-center items-start self-stretch">
            <h1 className="text-base font-semibold text-[#111827] leading-[26px] mb-[9px]">
              댓글 달기
            </h1>
            <textarea
              placeholder="댓글을 입력해주세요."
              className="items-start w-full h-[104px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
            />
          </div>
          <button className="flex justify-center items-center bg-[#9CA3AF] rounded-lg w-22 h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline">
            등록
          </button>
        </form>

        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, idx) => (
            <Comment key={idx} />
          ))}
        </div>

        <Link
          href="/freeboard"
          className="flex justify-center items-center mt-16"
        >
          <div className="flex justify-center items-center w-60 h-12 px-16 py-3 gap-2 bg-[#3692FF] rounded-[40px]">
            <p className="text-lg font-semibold text-[#F3F4F6] leading-none text-nowrap">
              목록으로 돌아가기
            </p>
            <Image
              src="/ic_back.svg"
              alt="Back Arrow"
              width={24}
              height={24}
              className="self-center"
            />
          </div>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardIdPage;
