import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Componet/Header";
import Footer from "../Componet/Footer";
import ProductCard from "../Componet/ProductCard";
import Pagination from "../Componet/Pagination";
import SearchBar from "../Componet/SearchBar";
import SortDropdown from "../Componet/SortDropdown";
import AddItemButton from "../Componet/AddItemButton";
import axios from "axios";
import "../css/MarketPage.css";

const MarketPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const limit = 10;

  useEffect(() => {
    loadItems();
  }, [page, query, sort]);

  const loadItems = async () => {
    try {
      const offset = (page - 1) * limit;
      const res = await axios.get("http://localhost:3000/items", {
        params: { offset, limit, q: query, sort },
      });

      setItems(res.data.items || []);
      setTotal(res.data.totalCount || 0);
    } 
    catch (err) {
      console.error("상품 목록 불러오기 실패:", err);
      setItems([]);
      setTotal(0);
    }
  };

  return (
    <div>
      <Header active="items" />
      <main className="marketContainer">
        <div className="marketToolbar">
          <h2 className="marketTitle">판매 중인 상품</h2>
          <div className="marketActions">
            <SearchBar value={query} onChange={setQuery} />
            <SortDropdown sort={sort} setSort={setSort} />
            <AddItemButton onClick={() => navigate("/registration")} />
          </div>
        </div>

        <div className="marketGrid">
          {items.length > 0 ? (
            items.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          ) : (
            <p className="emptyMessage">상품이 없습니다.</p>
          )}
        </div>

        <div className="marketPagination">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={setPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketPage;
