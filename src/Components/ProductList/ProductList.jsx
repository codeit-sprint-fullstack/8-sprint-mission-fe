import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { getProductList } from '../../API/ProductService';
import './ProductList.module.css';

function ProductList({ query, onLoad }) {   // 한 줄에 4개씩 보여주도록 하는 기능 구현해야 함.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductList(query).then((data) => {
      setProducts(data.list);
      onLoad(data);
    })
  }, [query]);

  return (
    <ul className="productList">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}

export default ProductList;