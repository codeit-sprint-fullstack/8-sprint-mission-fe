import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/Controller/SearchBar/SearchBar";
import DropDown from "@/components/Controller/Dropdown/DropDown";

const ProductListController = ({ option: controls = {}, setQuery = null }) => {
  const [keyword, setSearchWord] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setQuery?.((prev) => ({ ...prev, keyword, page: 1 }));
    }
  };

  return (
    <div className="flex items-center justify-between my-6 flex-wrap gap-4">
      <h2 className="text-lg font-bold text-gray-900">판매 중인 상품</h2>

      <div className="flex gap-3">
        <SearchBar
          value={keyword}
          onChange={setSearchWord}
          onSearch={handleSearch}
        />
        <Link
          href="/items/write"
          className="flex justify-center items-center bg-[#3692FF] rounded-lg h-[42px] px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline"
        >
          상품 등록하기
        </Link>
        <DropDown options={controls.sortOptions} setQuery={setQuery} />
      </div>
    </div>
  );
};

export default ProductListController;
