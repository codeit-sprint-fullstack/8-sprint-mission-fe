import { useState } from 'react';
import { ProductCard } from '../components/molecules/ProductCard';
import styles from '../styles/pages/ProductListPage.module.css';
import { ProductListTitle } from '../components/atoms/ProductListTitle';
import { Pagination } from '../components/molecules/Pagination';
import { SearchInput } from '../components/molecules/SearchInput';
import { Link } from 'react-router-dom';
import { Dropdown } from '../components/molecules/Dropdown';
import { useBestProducts } from '../lib/hooks/useBestProducts';
import { useProducts } from '../lib/hooks/useProducts';
import { useDeviceType } from '../lib/hooks/useDeviceType';

// 화면 가로 사이즈 대비 모바일, 태블릿, 데스크탑 체크 시 보여줄 상품 갯수
const pageSizes = {
  mobile: { bestProductPageSize: 1, pageSize: 4 },
  tablet: { bestProductPageSize: 2, pageSize: 6 },
  desktop: { bestProductPageSize: 4, pageSize: 10 },
};

export function ProductListPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [searchValue, setSearchValue] = useState(''); // 인풋에 입력할 때 입력 받을 상태 값
  const [keyword, setKeyword] = useState(''); // 검색 버튼 또는 엔터키 눌렀을 때 실제 검색 값
  const [orderBy, setOrderBy] = useState('recent'); // 정렬 기준
  const deviceType = useDeviceType(); // 화면 가로 사이즈 대비 모바일, 태블릿, 데스크탑 체크

  const { bestProductPageSize, pageSize } = pageSizes[deviceType];

  /**
   * 베스트 상품 리스트 조회
   */
  const { bestProductsList, bestProductsLoading, bestProductsError } =
    useBestProducts(bestProductPageSize);

  /**
   * 판매 중인 상품 리스트 조회
   */
  const { productsList, pageCount, productsLoading, productsError } = useProducts(
    currentPage,
    pageSize,
    keyword,
    orderBy
  );

  /**
   * 페이지 번호 변경 시 호출할 함수
   * @param {number} page 변경할 페이지 번호
   */
  const handleCurrentPageChange = (page) => {
    setCurrentPage(page);
  };

  /**
   * 검색 값 변경 시 호출할 함수
   * @param {React.ChangeEvent<HTMLInputElement>} e 이벤트 객체
   */
  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  /**
   * 검색 버튼 클릭 및 엔터 키 눌렀을 때 호출할 함수
   * @param {React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>} e 이벤트 객체
   */
  const handleSearchEvent = async (e) => {
    const isEnterKey = e.key === 'Enter';
    const isClick = e.type === 'click';

    if (isEnterKey || isClick) {
      setKeyword(searchValue);
      setCurrentPage(1);
    }
  };

  /**
   * 최신순, 좋아요순 정렬 이벤트 핸들러
   * @param {"recent" | "favorite"} value 정렬 기준
   */
  const handleSortEvent = async (value) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  return (
    <>
      <main className={styles.main}>
        {/* 베스트 상품 리스트 */}
        <section className={styles.productListSection}>
          <ProductListTitle title="베스트 상품" />
          <div className={styles.bestProductList}>
            {bestProductsLoading || bestProductsError ? (
              <div className={styles.loading}>
                {bestProductsLoading
                  ? '제품을 불러오는 중입니다.'
                  : '제품을 불러오는 중에 오류가 발생했습니다.'}
              </div>
            ) : (
              bestProductsList.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    favoriteCount={product.favoriteCount}
                  />
                );
              })
            )}
          </div>
        </section>

        {/* 판매 중인 상품 정렬 및 검색 */}
        <section>
          <div className={styles.productListTitleWrapper}>
            <ProductListTitle title="판매 중인 상품" />
            {/* 검색 인풋 */}
            <SearchInput
              className={styles.searchInputComponent}
              name="search"
              placeholder="검색할 상품을 입력해주세요"
              value={searchValue}
              onChange={handleSearchValueChange}
              onClick={handleSearchEvent}
              onKeyDown={handleSearchEvent}
            />
            {/* 상품 등록 버튼 */}
            <div className={styles.productListRegisterButton}>
              <Link to="#" className="btn-small-40">
                상품 등록하기
              </Link>
            </div>
            {/* 정렬 드롭다운 */}
            <Dropdown onClick={handleSortEvent} className={styles.productListSortButton} />
          </div>

          {/* 판매 중인 상품 리스트 */}
          <div className={styles.productList}>
            {productsLoading || productsError ? (
              <div className={styles.loading}>
                {productsLoading
                  ? '제품을 불러오는 중입니다.'
                  : '제품을 불러오는 중에 오류가 발생했습니다.'}
              </div>
            ) : productsList.length > 0 ? (
              productsList.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    favoriteCount={product.favoriteCount}
                  />
                );
              })
            ) : (
              <div className={styles.noProduct}>검색 결과가 없습니다.</div>
            )}
          </div>
        </section>

        {/* 페이지네이션 */}
        <Pagination
          totalItems={pageCount} // 전체 상품 갯수
          productCountPerPage={pageSize} // 한 페이지에 보여줄 상품 갯수
          pageCount={5} // 한 페이지에 보여줄 페이지 넘버 수
          currentPage={currentPage} // 현재 페이지 번호
          onPageChange={handleCurrentPageChange} // 페이지 번호 변경 시 호출할 함수
        />
      </main>
    </>
  );
}
