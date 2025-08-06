import { useEffect, useState } from 'react';
import { ProductCard } from '../components/molecules/ProductCard';
import styles from '../styles/pages/ProductListPage.module.css';
import { getBestProducts, getProducts } from '../api/productsApi';
import { ProductListTitle } from '../components/atoms/ProductListTitle';
import { Pagination } from '../components/molecules/Pagination';

export function ProductListPage() {
  const [bestProductsList, setBestProductsList] = useState([]); // 베스트 상품 리스트
  const [productsList, setProductsList] = useState([]); // 상품 리스트
  const [pageCount, setPageCount] = useState(0); // 전체 페이징 넘버 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const pageSize = 10; // 한 페이지에 보여줄 데이터 갯수

  useEffect(() => {
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

  const handleCurrentPageChange = (page) => {
    setCurrentPage(page);
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
          <ProductListTitle title="판매 중인 상품" />
          <div className={styles.productList}>
            {productsList.map((product) => {
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
