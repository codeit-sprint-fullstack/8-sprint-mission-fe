import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { getProduct } from "../lib/api.js";
import styles from "../styles/BestProduct.module.scss";

export function BestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const [loadingStatus, setLoadingStatus] = useState(null);

  const fetchBestProduct = async (
    options = {
      page: 1,
      pageSize: 4,
      orderBy: "favorite",
    }
  ) => {
    let result;

    try {
      setLoadingError(null);
      setLoading(true);
      result = await getProduct(options);
      setProducts(result.list);

      setLoadingStatus("API 불러오기 성공");
    } catch (error) {
      setLoadingError(error);

      setLoadingStatus(`에러: ${error.message}`);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestProduct();
  }, []);

  return (
    <div className={styles.bestProduct}>
      <div className={styles.title}>베스트 상품</div>
      <div className={styles.productCardList}>
        {products.map((product) => {
          return (
            <ProductCard product={product} key={product.id} type={"best"} />
          );
        })}
      </div>
    </div>
  );
}
