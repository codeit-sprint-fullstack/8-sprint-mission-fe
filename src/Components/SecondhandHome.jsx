import { useState } from "react";
import Header from './Header/Header';
import ProductListController from './SecondHandMarketPage/ProductList/ProductListController/ProductListController';
import ProductList from './SecondHandMarketPage/ProductList/ProductList.jsx';
import PageButton from './SecondHandMarketPage/PageButton/PageButton';
import Footer from './Footer/Footer';
import '../style/style.css';

function SecondhandHome() {
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

          <PageButton 
            nowPage={productListQuery.page}
            totalCount={totalCount}
            onChange={(newPage) => setProductListQuery(prev => ({ ...prev, page: newPage }))} 
          />
      </main>

      <Footer />
    </>
  );
}

export default SecondhandHome;