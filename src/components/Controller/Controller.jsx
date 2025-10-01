"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown";

const Controller = ({ controls = {}, articles = [], setSortedArticles }) => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState({
    label: "최신순",
    value: "recent",
  });

  const handleSearch = () => {
    const filtered = articles.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    setSortedArticles(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);

    const sorted = [...articles].sort((a, b) => {
      if (option.value === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (option.value === "like") return b.likeCount - a.likeCount;
      return 0;
    });

    setSortedArticles(sorted);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#1F2937]">게시글</h1>
        <Link
          href="/freeboard/write"
          className="flex justify-center items-center bg-[#3692FF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline"
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
