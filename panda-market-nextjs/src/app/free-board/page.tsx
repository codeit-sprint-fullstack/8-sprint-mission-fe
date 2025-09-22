"use client";

import BestCard from "@/components/organisms/BestCard";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface BestArticle {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  author: string;
  likes: number;
  createdAt: string;
}

async function getBestArticles(): Promise<BestArticle[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/best-Articles`
  );
  return response.json();
}

export default function FreeBoardPage() {
  const {
    data: bestArticles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bestArticles"],
    queryFn: getBestArticles,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {isError.toString()}
      </div>
    );
  }

  return (
    <>
      <section>
        <h1 className="text-xl font-bold mb-6">베스트 게시글</h1>

        <div>
          {bestArticles?.map((article) => (
            <BestCard
              key={article.id}
              title={article.title}
              image="/free-board/note-book-img.png"
              nickname={article.author}
              createdAt={dayjs(article.createdAt).format("YYYY. MM. DD.")}
              likeCount={article.likes}
            />
          ))}
          {/* <BestCard
            title="맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?"
            image="/free-board/note-book-img.png"
            nickname="총명한 판다"
            createdAt={new Date().toLocaleDateString("ko-KR", options)}
            likeCount={10}
          /> */}
        </div>
      </section>

      <div></div>
    </>
  );
}
