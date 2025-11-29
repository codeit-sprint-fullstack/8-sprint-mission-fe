"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown";
import type { ControllerProps, DropDownOption } from "@/types/controller";

const Controller = ({
  controls = {},
  articles = [],
  setSortedArticles,
}: ControllerProps) => {
  const [search, setSearch] = useState<string>("");
  const [sortOption, setSortOption] = useState<DropDownOption>({
    label: "최신순",
    value: "recent",
  });

  const handleSearch = () => {
    const filtered = articles.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    setSortedArticles(filtered);
  };

  const handleSort = (option: DropDownOption) => {
    setSortOption(option);

    const sorted = [...articles].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (option.value === "recent") {
        return dateB - dateA;
      }
      if (option.value === "like") return b.likeCount - a.likeCount;
      return 0;
    });

    setSortedArticles(sorted);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">게시글</h1>
        <Link
          href="/articles/write"
          className="flex justify-center items-center bg-[#3692FF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-gray-100 whitespace-nowrap hover:underline"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex justify-between items-center gap-auto mb-6 w-full">
        {controls.search && (
          <SearchBar
            search={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />
        )}
        {controls.orderBy && (
          <DropDown
            options={[
              { label: "최신순", value: "recent" },
              { label: "좋아요순", value: "like" },
            ]}
            selected={sortOption}
            onSelect={handleSort}
          />
        )}
      </div>
    </div>
  );
};

export default Controller;
