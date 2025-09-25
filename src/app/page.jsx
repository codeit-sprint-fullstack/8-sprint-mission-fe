import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <h1 className="text-black">랜딩 페이지 마이그레이션</h1>
        <p className="text-black">헤더에서 자유게시판 클릭 후 이동하기</p>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
