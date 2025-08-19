import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { getProductList } from '../../API/ProductService';
import style from './ProductList.module.css';

function ProductList({ query, onLoad }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList(query).then((data) => {
      setProducts(data.list);
      onLoad(data);
    })
    .catch((error) => {
      console.error("상품 목록을 불러오는 중 오류 발생:", error);
    })
  }, [query, onLoad]);

  return (
    <ul className={style.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}

export default ProductList;