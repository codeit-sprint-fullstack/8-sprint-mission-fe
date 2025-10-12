"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import KebabMenu from "@/components/Kebab/KebabMenu";
import LikeButton from "@/components/Button/LikeButton";
import { fetchArticle } from "@/api/articles";

const ArticleDatail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await fetchArticle(id);

        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };
    getBoard();
  }, [id]);

  if (!article) return null;

  return (
    <div className="flex flex-col items-start self-stretch mb-8">
      <div className="flex flex-col items-start self-stretch mb-6">
        <div className="flex items-start gap-2 self-stretch mb-4">
          <h1 className="w-full text-xl font-bold text-gray-800 leading-8">
            {article.title}
          </h1>
          <KebabMenu type="article" id={article.id} />
        </div>

        <div className="flex items-center gap-8 place-self-stretch mb-4 w-full">
          <div className="flex items-center gap-4 text-sm leading-6 mr-4">
            <Image src="/ic_profile.svg" alt="Profile" width={40} height={40} />
            <div className="flex items-start gap-2">
              <p className="font-medium text-gray-600">{article.nickname}</p>
              <p className="font-normal text-gray-400">{article.createdAt}</p>
            </div>
          </div>

          <div className="h-[34px] border-l border-gray-200" />

          <LikeButton
            type="article"
            targetId={article.id}
            initialCount={article.likeCount}
            initialLiked={article.isLiked}
          />
        </div>
      </div>

      <hr className="w-full border-t border-gray-200 mb-4" />

      <p className="text-lg font-normal text-gray-800 leading-[26px]">
        {article.content}
      </p>
    </div>
  );
};

export default ArticleDatail;
