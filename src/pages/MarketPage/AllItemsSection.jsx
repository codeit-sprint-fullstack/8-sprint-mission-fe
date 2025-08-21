import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getProducts } from "../../data/itemApi";
import ItemCard from "../../components/Layout/ItemCard";
import DropdownList from "../../components/Layout/DropdownList";
import PaginationBar from "../../components/Layout/PaginationBar";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 4;
  if (width < 1280) return 6;
  return 10;
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState();
  const [keyword, setKeyword] = useState("");

  const fetchSortedData = async ({ orderBy, page, pageSize, keyword }) => {
    const products = await getProducts({ orderBy, page, pageSize, keyword });
    setItemList(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
    setIsDropdownVisible(false);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSortedData({ orderBy, page: 1, pageSize, keyword });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  const convertToKorean = (orderBy) => {
    switch (orderBy) {
      case "recent":
        return "최신순";
      case "favorite":
        return "인기순";
      default:
        return "최신순";
    }
  };

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize, keyword });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  return (
    <div>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>

        <div className="searchBarWrapper">
          <img src="/assets/ic_search.svg" alt="검색" />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Link to="/registration" className="createItemButton button">
          상품 등록하기
        </Link>

        <div className="sortButtonWrapper">
          <button
            className="sortDropdownTriggerButton"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <div className="sortBtn">
              <span>{convertToKorean(orderBy)}</span>
              <img src="/assets/ic_arrow_down.svg" alt="정렬" />
            </div>
            <img
              src="/assets/ic_sort_mobile.svg"
              alt="모바일 정렬"
              className="mobileSortBtn"
            />
          </button>
          {isDropdownVisible && (
            <DropdownList onSortSelection={handleSortSelection} />
          )}
        </div>
      </div>

      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}

export default AllItemsSection;
