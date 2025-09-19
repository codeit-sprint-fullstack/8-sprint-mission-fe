import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Comment from "@/components/Comment";

const freeboardIdPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto p-4 w-[1200px]">
        <div>
          <div>
            <h1>title</h1>
            <Image
              src="/ic_kebab.svg"
              alt="Kebab icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <div>
              <Image
                src="/ic_profile.svg"
                alt="Profile"
                width={40}
                height={40}
              />
              <p>user_name</p>
              <p>createdAt</p>
            </div>
            <div>
              <Image src="/ic_heart.svg" alt="Heart" width={32} height={32} />
              <p>123</p>
            </div>
          </div>
          <div>
            <p>content</p>
          </div>
        </div>

        <form>
          <h1>댓글 달기</h1>
          <textarea
            placeholder="댓글을 입력해주세요."
            className="items-start w-full h-[104px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
          />
          <button className="flex justify-center items-center bg-[#9CA3AF] rounded-lg w-22 h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline">
            등록
          </button>
        </form>

        <div>
          <Comment />
        </div>

        <Link href="/freeboard">
          목록으로 돌아가기
          <Image src="/ic_back.svg" alt="Back Arrow" width={24} height={24} />
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardIdPage;
