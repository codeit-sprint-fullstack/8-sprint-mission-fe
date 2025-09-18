import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
            <button className="" onClick={handleMovePage}>
              글쓰기
            </button>
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
