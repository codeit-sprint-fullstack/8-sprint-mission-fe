import Header from "./Header";
import "./css/App.css";
import BestProducts from "./products/BestProducts";
import { getProductList } from "../api";
import { useEffect, useState } from "react";
import ProductsList from "./products/ProductsList";

function App() {
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("recent");
  const handleBestClick = () => setOrder("favorite");

  // BestProducts 요청
  const handleBestLoad = async () => {
    try {
      const result = await getProductList({
        page: 1,
        pageSize: 4,
        keyword,
        orderBy: "favorite",
      });
      setBestItems(result.list || []);
    } catch (error) {
      console.error("베스트상품 불러오기 실패:", error.message);
    }
  };

  // ProductsList 요청
  const handleItemsLoad = async () => {
    let result;
    try {
      result = await getProductList({
        page: page,
        pageSize: pageSize,
        keyword: keyword,
        orderBy: order,
      });
    } catch (error) {
      console.error(error.message);
      return;
    }

    console.log("제품 목록:", result);
    setItems(result.list || []);
  };

  // BestProducts 최초 로딩
  useEffect(() => {
    handleBestLoad();
  }, []);

  // ProductsList는 order 바뀌거나 페이지 바뀔 때마다 요청
  useEffect(() => {
    handleItemsLoad();
  }, [order, page]);

  return (
    <div>
      <Header />
      <BestProducts items={bestItems} />
      <ProductsList items={items} />
    </div>
  );
}

export default App;
