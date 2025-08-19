import { useState } from "react";
import Header from './Components/Header/Header';
import BestProductList from './Components/ProductList/BestProductList/BestProductList';
import ProductListController from './Components/ProductList/ProductListController/ProductListController';
import ProductList from './Components/ProductList/ProductList';
import PageButton from './Components/PageButton/PageButton';
import Footer from './Components/Footer/Footer';
import '../style/style.css';

function Home() {
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

export default Home;