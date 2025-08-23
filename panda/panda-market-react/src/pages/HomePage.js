import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BestProductList from '../components/BestProductList';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { getProductList } from '../services/productService';
import useResponsive from '../hooks/useResponsive';
import '../styles/homepage.css';
import '../styles/home.css';
import searchIcon from '../assets/search-icon.svg';


const LIST_PAGE_SIZE = {
  desktop: 10,
  tablet: 6,
  mobile: 4,
};

const BEST_PAGE_SIZE = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
};


function HomePage() {
  const breakpoint = useResponsive();
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [rawKeyword, setRawKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const listPageSize = LIST_PAGE_SIZE[breakpoint] ?? LIST_PAGE_SIZE.mobile;
  const bestPageSize = BEST_PAGE_SIZE[breakpoint] ?? BEST_PAGE_SIZE.mobile;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKeyword(rawKeyword.trim());
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [rawKeyword]);

  useEffect(() => {
    setCurrentPage(1);
  }, [breakpoint, orderBy, keyword]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getProductList({
          page: currentPage,
          pageSize: listPageSize,
          orderBy,
          keyword,
        });
        if (!cancelled) {
          setProducts(data?.products || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error('[상품 목록 불러오기 실패]', err);
      }
    })();

    return () => { cancelled = true; };
  }, [currentPage, listPageSize, orderBy, keyword]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try{
        const data = await getProductList({
          page: 1,
          pageSize: bestPageSize,
          orderBy: 'favorite',
          keyword: '',
        });
        if (!cancelled) {
          setBestProducts(data?.products || []);
        }
      } catch (err) {
        console.error('[베스트 상품 불러오기 실패]', err);
      }
    })();

    return () => { cancelled = true; };
  }, [bestPageSize]);

  return (
    <>
      <Header />
      <main className="home-page">
        <section className="best-section">
          <BestProductList products={bestProducts} />
        </section>

        <div className="product-section-header">
          <h2 className="section-title">판매 중인 상품</h2>

          <div className="controls-wrapper">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
              <input
                type="text"
                value={rawKeyword}
                onChange={(e) => setRawKeyword(e.target.value)}
                placeholder="검색할 상품을 입력해주세요"
                className="search-input"
              />
            </div>

            <Link to="/registration" className="register-button">상품 등록하기</Link>

            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        <section className="products-section">
            <ProductList products={products} />

          <div className="pagination-host">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;