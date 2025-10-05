"use client";

import Image from "next/image";

const SearchBar = ({ search, onChange, onSearch }) => {
  return (
    <div className="relative w-full mr-1">
      <input
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="검색할 상품을 입력해주세요."
        className="w-full h-[42px] pl-12 pr-4 py-2 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-gray-400 text-black"
      />
      <Image
        src="/ic_search.svg"
        alt="검색 아이콘"
        width={24}
        height={24}
        onClick={onSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
