import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const BoardWritePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-[#1F2937]">게시글 쓰기</h1>
            <button className="flex justify-center items-center bg-[#9CA3AF] rounded-lg w-22 h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline">
              등록
            </button>
          </div>

          <div>
            <form className="mb-6">
              <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">
                *제목
              </h1>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                className="items-start w-full h-14 px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
              />
            </form>
            <form>
              <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">
                *내용
              </h1>
              <textarea
                placeholder="내용을 입력해주세요."
                className="items-start w-full h-[282px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
              />
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BoardWritePage;
