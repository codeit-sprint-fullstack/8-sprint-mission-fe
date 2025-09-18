"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/navigation";

const freeboardPage = () => {
  const router = useRouter();

  const handleMovePage = () => {
    router.push(`/freeboard/write`);
  };

  return (
    <div>
      <Header />

      <main>
        <div>
          <h1>베스트 게시글</h1>
          <BestCard />
        </div>

        <div>
          <div>
            <h1>게시글</h1>
            <Link className="" onClick={handleMovePage}>
              글쓰기
            </Link>
          </div>
          <Controller />

          <Card />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardPage;
