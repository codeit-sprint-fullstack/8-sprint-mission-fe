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

  /**
   * 검색 값 변경 시 호출할 함수
   * @param e 이벤트 객체
   */
  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /**
   * 검색 버튼 클릭 및 엔터키 눌렀을 때 호출할 함수
   * @param e
   */
  const handleSearchKeyDownEvent = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setKeyword(inputValue);
      setCurrentPage(1);
    }
  };

  /**
   * 최신순, 좋아요순 정렬 이벤트 핸들러
   * @param value
   */
  const handleOrderByEvent = (value: string) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  /**
   * 페이지 번호 변경 시 호출할 함수
   * @param page
   */
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
