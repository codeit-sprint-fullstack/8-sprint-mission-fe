import { useEffect, useState } from "react";
import ProductCard from '../ProductCard/ProductCard';
import { getProductList } from '../../../API/ProductService';
import style from './BestProductList.module.css';

function BestProductList({
  page = 1,
  pageSize = 10,
  orderBy = "favorite",
  keyword = "",
  onLoad,
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const bestQuery = { page, pageSize, orderBy: "favorite", keyword };

    getProductList(bestQuery)
    .then((data) => {
      setProducts(data.list);
      if (onLoad) onLoad(data);
    })
    .catch((error) => {
      console.error("베스트 상품 목록을 불러오는 중 오류 발생:", error);
    })
  }, [page, pageSize, orderBy, keyword, onLoad]);

  return (
    <section className={style.bestProduct}>
      <h2>베스트 상품</h2>

      <ul className={style.bestProductList}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default BestProductList;