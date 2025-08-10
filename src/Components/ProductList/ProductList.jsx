import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { getProductList } from '../../API/ProductService';
import style from './ProductList.module.css';

function ProductList({ query, onLoad }) {   // 한 줄에 n개씩 보여주도록 하는 기능 js만으로는 못하나?
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList(query).then((data) => {
      setProducts(data.list);
      onLoad(data);
    })
    .catch((error) => {
      console.error("상품 목록을 불러오는 중 오류 발생:", error);
    })
  }, [query]);

  return (
    <ul className={style.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}

export default ProductList;

// 에러 핸들링을 여기서 하는 거였나..? 요구 사항에 있나?