import { useState } from "react";
import Header from './Header/Header';
import BestProductList from './ProductList/BestProductList/BestProductList';
import ProductListController from './ProductList/ProductListController/ProductListController';
import ProductList from './ProductList/ProductList';
import PageButton from './PageButton/PageButton';
import Footer from './Footer/Footer';
import '../style/style.css';

function App() {
  const [productListQuery, setProductListQuery] = useState({
    page: 1,
    pageSize: 10,
    orderBy: 'recent',
    keyword: ''
  });
  const [totalCount, setTotalCount] = useState(50);

  return (
    <>
      <Header />

      <main>
        <section>
          <BestProductList />
        </section>
        
        <section>
          <ProductListController
            option={{ search: true, upload: true, orderBy: true }}
            setQuery={setProductListQuery}
          />
          <ProductList
            query={productListQuery}
            itemsPerRow={5}
            onLoad={(data) => setTotalCount(data.totalCount)}
          />
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

export default App;