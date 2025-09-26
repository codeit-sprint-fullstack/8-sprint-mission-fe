import { useState } from "react";
import { useArticlesQuery } from "@/lib/api/articles/queries";

type UseArticlesProps = number;

export default function useArticles(ARTICLE_PAGE_SIZE: UseArticlesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [inputValue, setInputValue] = useState("");

  const {
    data: articles,
    isLoading: isLoading,
    isError: isError,
  } = useArticlesQuery.useGetArticles({
    page: currentPage,
    pageSize: ARTICLE_PAGE_SIZE,
    orderBy: orderBy as "recent" | "like",
    keyword: keyword,
  });

  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSearchKeyDownEvent = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setKeyword(inputValue);
      setCurrentPage(1);
    }
  };

  const handleOrderByEvent = (value: string) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    keyword,
    orderBy,
    inputValue,
    handleSearchEvent,
    handleSearchKeyDownEvent,
    handleOrderByEvent,
    handlePageChange,
    articles,
    isLoading,
    isError,
  };
}
