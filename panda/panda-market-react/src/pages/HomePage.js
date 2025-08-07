import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BestProductList from '../components/BestProductList';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { getProductList } from '../services/productService';
import '../styles/home.css';
import searchIcon from '../assets/search-icon.svg';


function HomePage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [sort, setSort] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList({
          page: currentPage,
          pageSize: 10,
          sort,
          keyword,
        });
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('[상품 목록 불러오기 실패]', err);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, sort, keyword]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const data = await getProductList({
          page: 1,
          pageSize: 4,
          sort: 'favorite',
          keyword: '',
        });
        setBestProducts(data.products || []);
      } catch (err) {
        console.error('[베스트 상품 불러오기 실패]', err);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <>
      <Header />
      <main>
        <BestProductList products={bestProducts} />

        <div className="product-section-header">
          <h2 className="section-title">판매 중인 상품</h2>

          <div className="controls-wrapper">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색할 상품을 입력해주세요"
                className="search-input"
              />
            </div>

            <button className="register-button">상품 등록하기</button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        <div className="product-list-wrapper">
          <ProductList products={products} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;