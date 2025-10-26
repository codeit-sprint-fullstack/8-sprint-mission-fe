"use client";

import { useState, useEffect } from "react";
import BestArticle from "@/components/Article/BestArticle";

const BestArticleSection = ({ bestArticles = [], loading, error }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 743) setVisibleCount(1); // 모바일
      else if (width < 1199) setVisibleCount(2); // 태블릿
      else setVisibleCount(3); // 데스크탑
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <section>
      <h1 className="mb-6 text-xl text-gray-900 font-bold">베스트 게시글</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <div className="col-span-full text-center py-10 text-gray-400">
            베스트 게시글을 불러오는 중입니다...
          </div>
        )}

        {error && (
          <div className="col-span-full text-center py-10 text-gray-400">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {bestArticles.length > 0 ? (
              bestArticles
                .slice(0, visibleCount)
                .map((article) => (
                  <BestArticle key={article.id} article={article} />
                ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">
                베스트 게시글이 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BestArticleSection;
