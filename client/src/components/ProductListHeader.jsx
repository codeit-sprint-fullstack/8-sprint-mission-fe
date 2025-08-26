import ic_search from "../assets/ic_search.svg";
import ic_arrow_down from "../assets/ic_arrow_down.svg";
import { Link } from "react-router-dom";
import styles from "../styles/ProductListHeader.module.scss";

function ProductListHeader({ search, setSearch, sortValue, setSortValue }) {
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  const handleDropDown = (e) => {
    const productSort = e.target.value;
    setSortValue(productSort);
  };

  return (
    <div className={styles.productListHeader}>
      <div className={styles.title}>판매 중인 상품</div>
      <div className={styles.listHeader}>
        <div className={styles.searchWrapper}>
          <img src={ic_search} alt="searchIc" />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Link className={styles.addButton} to="/registration">
          상품 등록하기
        </Link>
        <div className={styles.customSelectContainer}>
          <select
            className={styles.hiddenSelect}
            onChange={handleDropDown}
            value={sortValue}
          >
            <option value={"recent"}>최신순</option>
            <option value={"favorite"}>좋아요순</option>
          </select>
          <div className={styles.customSelectDisplay}>
            <span className={styles.selectedText}>
              {sortValue === "recent" && "최신순"}
              {sortValue === "favorite" && "좋아요순"}
            </span>
            <img
              className={styles.dropdownArrow}
              src={ic_arrow_down}
              alt="arrowDownIC"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListHeader;
