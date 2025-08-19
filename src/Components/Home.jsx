import { useState } from "react";
import Header from './Header/Header';
import BestProductList from './ProductList/BestProductList/BestProductList';
import ProductListController from './ProductList/ProductListController/ProductListController';
import ProductList from './ProductList/ProductList';
import PageButton from './PageButton/PageButton';
import Footer from './Footer/Footer';
import '../style/style.css';

function Home() {
  const [productListQuery, setProductListQuery] = useState({
    page: 1,
    pageSize: 10,
    orderBy: 'recent',
    keyword: ''
  });
  const [totalCount, setTotalCount] = useState(50);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoad = (data) => {
    setLoading(false);
    setError(null);
    try {
      setTotalCount(data.totalCount);
      return data;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return (
    <>
      <Header />

      <main>
        <section>
          <BestProductList
            page={productListQuery.page}
            pageSize={productListQuery.pageSize}
            orderBy={productListQuery.orderBy}
            keyword={productListQuery.keyword}
            

          />
        </section>
        
        <section>
          <ProductListController
            option={{ search: true, upload: true, orderBy: true }}
            setQuery={setProductListQuery}
          />

          {loading && <p>상품 목록 로딩중...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
          {!loading && !error && (
            <ProductList
              query={productListQuery}
              itemsPerRow={5}
              onLoad={handleLoad}
            />
          )}
        </section>

        <section>
          <PageButton 
            nowPage={productListQuery.page}
            totalCount={totalCount}
            onChange={(newPage) => setProductListQuery(prev => ({ ...prev, page: newPage }))} 
          />
        </section>
        
      </main>

      <Footer />
    </>
  );
}

export default Home;