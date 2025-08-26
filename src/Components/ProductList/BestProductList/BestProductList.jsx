import { useEffect, useState } from "react";
import ProductCard from '../ProductCard/ProductCard';
import { getProductList } from '../../../API/ProductService';
import style from './BestProductList.module.css';

function BestProductList({ query ={}, onLoad }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const bestQuery = { ...query, orderBy: "favorite" };

    getProductList(bestQuery).then((data) => {
      setProducts(data.list);
      onLoad(data);
    })
    .catch((error) => {
      console.error("베스트 상품 목록을 불러오는 중 오류 발생:", error);
    })
  }, [query, onLoad]);

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