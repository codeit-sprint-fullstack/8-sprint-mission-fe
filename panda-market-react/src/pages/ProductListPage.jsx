import { useEffect, useState } from 'react';
import { ProductCard } from '../components/molecules/ProductCard';
import styles from '../styles/pages/ProductListPage.module.css';
import { getBestProducts, getProducts } from '../api/productsApi';
import { ProductListTitle } from '../components/atoms/ProductListTitle';
import { Pagination } from '../components/molecules/Pagination';
import { SearchInput } from '../components/molecules/SearchInput';
import { Link } from 'react-router-dom';
import { Dropdown } from '../components/molecules/Dropdown';

const pageSize = 10; // 한 페이지에 보여줄 데이터 갯수

export function ProductListPage() {
  const [bestProductsList, setBestProductsList] = useState([]); // 베스트 상품 리스트
  const [productsList, setProductsList] = useState([]); // 상품 리스트
  const [pageCount, setPageCount] = useState(0); // 전체 페이징 넘버 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [searchValue, setSearchValue] = useState(''); // 검색 값

  useEffect(() => {
    /**
     * 베스트 상품 리스트 조회
     */
    const getBestProductsList = async () => {
      try {
        const response = await getBestProducts();
        const sortedList = response.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProductsList(sortedList);
      } catch (error) {
        console.error(error);
      }
    };
    getBestProductsList();
  }, []);

  useEffect(() => {
    /**
     * 상품 리스트 조회
     */
    const getProductsList = async () => {
      try {
        const response = await getProducts(currentPage, pageSize);
        setProductsList(response.list);
        setPageCount(response.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsList();
  }, [currentPage]);

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
   * 검색 버튼 클릭 시 호출할 함수
   */
  const handleSearchEvent = async (e) => {
    try {
      if (e.key === 'Enter') {
        const response = await getProducts(1, pageSize, searchValue);
        setProductsList(response.list);
        setPageCount(response.totalCount);
        console.log(response);
        console.log(searchValue);
        return;
      }

      if (searchValue === '') {
        const response = await getProducts(currentPage, pageSize);
        setProductsList(response.list);
        setPageCount(response.totalCount);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortEvent = (value) => {
    console.log(value);
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.productListSection}>
          <ProductListTitle title="베스트 상품" />
          <div className={styles.bestProductList}>
            {bestProductsList.map((product) => {
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
            })}
          </div>
        </section>
        <section>
          <div className={styles.productListTitleWrapper}>
            <ProductListTitle title="판매 중인 상품" />

            <SearchInput
              name="search"
              placeholder="검색할 상품을 입력해주세요"
              value={searchValue}
              onChange={handleSearchValueChange}
              onClick={handleSearchEvent}
              onKeyDown={handleSearchEvent}
            />
            <Link to="#" className="btn-small-40">
              상품 등록하기
            </Link>

            <Dropdown onClick={handleSortEvent} />
          </div>
          <div className={styles.productList}>
            {productsList.length > 0 ? (
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
