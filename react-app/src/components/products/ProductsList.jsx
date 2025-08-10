import ProductsItem from "./ProductsItem";
import { useEffect, useState } from "react";
import "./ProductsList.css";
import ic_search from "../../assets/icon/ic_search.svg";
import arrow from "../../assets/icon/arrow_right.svg";



function ProductsList({ items, totalCount, handleItemsLoad }) {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [order, setOrder] = useState("recent");

  const totalPages = Math.ceil(totalCount / 10);

  const handleNewestClick = () => setOrder("recent");
  const handleBestClick = () => setOrder("favorite");

  // input change 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  // onKeyDown 핸들러: Enter 키를 눌렀을 때 최종 상태 업데이트
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyword(inputValue);
    }
  };
  // onBlur 핸들러: input에서 포커스를 잃었을 때 최종 상태 업데이트
  const handleBlur = () => {
    setKeyword(inputValue);
  };

  // ProductsList는 order 바뀌거나 페이지 바뀔 때마다 요청
  useEffect(() => {
    handleItemsLoad(page, keyword, order);
  }, [page, keyword, order]);

  return (
    <section className="productsList">
      <div className="section-wrap">
        <div className="productsList-header">
          <h1>판매 중인 상품</h1>
          <div className="action-box">
            <div className="input-box">
              <img src={ic_search} alt="ic_search" />
              <input
                name="search"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
            </div>
            <button className="product-register">상품 등록하기</button>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleBestClick}>좋아요순</button>
          </div>
        </div>
        <ul className="productsList-container">
          {items.map((item) => {
            // map을 이용해서 렌더링
            return (
              <li key={item.id}>
                <ProductsItem item={item} />
              </li>
            );
          })}
        </ul>
        {/* 페이지네이션 */}
      </div>
    </section>
  );
}

export default ProductsList;
