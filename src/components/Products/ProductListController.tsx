import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/Controller/SearchBar/SearchBar";
import DropDown from "@/components/Controller/DropDown/DropDown";
import { ProductListControllerProps, DropDownOption } from "@/types/controller";

const ProductListController = ({
  controls = {},
  products = [],
  setSortedProducts,
}: ProductListControllerProps) => {
  const [search, setSearch] = useState<string>("");
  const [sortOption, setSortOption] = useState<DropDownOption>({
    label: "최신순",
    value: "recent",
  });

  const handleSearch = () => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setSortedProducts(filtered);
  };

  const handleSort = (option: { label: string; value: string }) => {
    setSortOption(option);

    const sorted = [...products].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (option.value === "recent") return dateB - dateA;
      if (option.value === "like") return b.favoriteCount - a.favoriteCount;
      return 0;
    });

    setSortedProducts(sorted);
  };

  return (
    <div className="flex items-center justify-between my-6 flex-wrap gap-4">
      <h2 className="text-lg font-bold text-gray-900">판매 중인 상품</h2>

      <div className="flex gap-3">
        <SearchBar
          search={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />
        <Link
          href="/registration"
          className="flex justify-center items-center bg-[#3692FF] rounded-lg h-[42px] px-[23px] py-3 text-base text-gray-100 whitespace-nowrap hover:underline"
        >
          상품 등록하기
        </Link>
        {controls.orderBy && (
          <DropDown
            options={[
              { label: "최신순", value: "recent" },
              { label: "좋아요순", value: "like" },
            ]}
            onSelect={handleSort}
            selected={sortOption}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListController;
