import Header from "./Header";
import "./css/App.css";
import BestProducts from "./products/BestProducts";
import { getProductList } from "../api";
import { useEffect, useState } from "react";
import ProductsList from "./products/ProductsList";
import Footer from "./Footer";

function App() {
  const PAGESIZE = 10;
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [bestItems, setBestItems] = useState([]);
  //const sortedItems = items.sort((a, b) => b[order] - a[order]);

  // BestProducts 요청
  const handleBestLoad = async () => {
    try {
      const result = await getProductList({
        page: 1,
        pageSize: 4,
        orderBy: "favorite",
      });
      setBestItems(result.list || []);
    } catch (error) {
      console.error("베스트상품 불러오기 실패:", error.message);
    }
  };

  // ProductsList 요청
  const handleItemsLoad = async (page, keyword, order) => {
    let result;
    try {
      result = await getProductList({
        page: page,
        pageSize: PAGESIZE,
        keyword: keyword,
        orderBy: order,
      });
    } catch (error) {
      console.error(error.message);
      return;
    }
    console.log(result);
    setItems(result.list || []);
    setTotalCount(result.totalCount);
  };

  // BestProducts 최초 로딩
  useEffect(() => {
    handleBestLoad();
  }, []);

  return (
    <div>
      <Header />
      <BestProducts items={bestItems} />
      <ProductsList items={items} totalCount={totalCount} handleItemsLoad={handleItemsLoad} />
      <Footer />
    </div>
  );
}

export default App;
