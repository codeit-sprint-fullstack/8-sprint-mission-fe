"use client";

import { useState } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import BasicPagination from "@/components/molecules/BasicPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useItemsQuery } from "@/lib/api/product/queries";
import { useDeviceType } from "@/hooks/useDeviceType";
import { ProductFilters } from "@/lib/api/product/fetchers";
import Link from "next/link";
import Text from "@/components/atoms/Text";
import { Spinner } from "@/components/ui/spinner";

// 화면 가로 사이즈 대비 모바일, 태블릿, 데스크탑 체크 시 보여줄 상품 갯수
const pageSizes = {
  mobile: 4,
  tablet: 6,
  desktop: 10,
};

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [searchValue, setSearchValue] = useState(""); // 인풋에 입력할 때 입력 받을 상태 값
  const [keyword, setKeyword] = useState(""); // 검색 버튼 또는 엔터키 눌렀을 때 실제 검색 값
  const [orderBy, setOrderBy] = useState<"recent" | "like">("recent"); // 정렬 기준
  const deviceType = useDeviceType(); // 화면 가로 사이즈 대비 모바일, 태블릿, 데스크탑 체크

  const pageSize = pageSizes[deviceType];

  /**
   * 판매 중인 상품 리스트 조회
   */
  const productsParams: ProductFilters = {
    page: currentPage,
    pageSize,
    keyword,
    orderBy,
  };

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useItemsQuery.useGetProducts(productsParams);

  const productsList = productsData?.products || [];
  const pageCount = productsData?.totalCount || 0;

  /**
   * 베스트 상품 리스트 조회
   */
  const {
    data: bestProductsList,
    isLoading: bestProductsLoading,
    error: bestProductsError,
  } = useItemsQuery.useGetBestProducts();
  /**
   * 페이지 번호 변경 시 호출할 함수
   * @param page 변경할 페이지 번호
   */
  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * 검색 값 변경 시 호출할 함수
   * @param e 이벤트 객체
   */
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  /**
   * 검색 버튼 클릭 및 엔터 키 눌렀을 때 호출할 함수
   * @param e 이벤트 객체
   */
  const handleSearchEvent = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const isEnterKey =
      e.type === "keydown" &&
      (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter";
    const isClick = e.type === "click";

    if (isEnterKey || isClick) {
      setKeyword(searchValue);
      setCurrentPage(1);
    }
  };

  /**
   * 최신순, 좋아요순 정렬 이벤트 핸들러
   * @param value 정렬 기준
   */
  const handleSortEvent = async (value: string) => {
    setOrderBy(value as "recent" | "like");
    setCurrentPage(1);
  };

  if (productsLoading || bestProductsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text styleName="text-lg-medium">
          <Spinner /> 제품을 불러오는 중입니다.
        </Text>
      </div>
    );
  }

  if (productsError || bestProductsError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text styleName="text-lg-medium" className="text-error">
          제품을 불러오는 중에 오류가 발생했습니다.
        </Text>
      </div>
    );
  }

  return (
    <>
      <main className="w-full max-w-[1260px] mx-auto px-4 md:px-[30px] py-12 pb-56">
        {/* 베스트 상품 섹션 */}
        {bestProductsList && bestProductsList.length > 0 && (
          <section className="mb-10">
            <Text styleName="text-xl-bold" className="mb-6" as="h1">
              베스트 상품
            </Text>

            {/* 베스트 상품 리스트 */}
            <div
              className={`grid gap-6 ${
                deviceType === "desktop"
                  ? "grid-cols-4"
                  : deviceType === "tablet"
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {bestProductsList?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  price={product.price}
                  image={
                    product.images[0]?.image?.url ||
                    "/product-list/prod-test.png"
                  }
                  likeCount={product.likeCount}
                />
              ))}
            </div>
          </section>
        )}

        {/* 판매 중인 상품 섹션 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text styleName="text-xl-bold" as="h1">
              판매 중인 상품
            </Text>
            <Button variant="default" asChild>
              <Link href="/product/create">상품 등록하기</Link>
            </Button>
          </div>

          {/* 검색 및 정렬 컴포넌트 */}
          <div className="flex justify-between items-center mb-6 gap-4">
            <Input
              value={searchValue}
              onChange={handleSearchValueChange}
              onKeyDown={handleSearchEvent}
              placeholder="검색할 상품을 입력해주세요"
              className="bg-secondary-100 border-none rounded-[12px] h-[42px]"
            />
            <Select value={orderBy} onValueChange={handleSortEvent}>
              <SelectTrigger className="w-[180px] !h-[42px]">
                <SelectValue placeholder="최신순" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">최신순</SelectItem>
                <SelectItem value="like">좋아요순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 판매 중인 상품 리스트 */}
          <div
            className={`grid gap-6 ${
              deviceType === "desktop"
                ? "grid-cols-5"
                : deviceType === "tablet"
                ? "grid-cols-3"
                : "grid-cols-2"
            }`}
          >
            {productsList.length > 0 ? (
              productsList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  price={product.price}
                  image={
                    product.images[0]?.image?.url ||
                    "/product-list/prod-test.png"
                  }
                  likeCount={product.likeCount}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-secondary-400 text-base mt-16">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </section>

        {/* 페이지네이션 */}
        <BasicPagination
          currentPage={currentPage}
          totalCount={pageCount}
          pageSize={pageSize}
          onPageChange={handleCurrentPageChange}
        />
      </main>
    </>
  );
}
