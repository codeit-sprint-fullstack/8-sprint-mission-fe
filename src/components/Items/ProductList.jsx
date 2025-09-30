import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/api/product";

const ProductList = ({ query, onLoad }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(query)
      .then((data) => {
        setProducts(data.list);
        onLoad(data);
      })
      .catch((error) => {
        console.error("상품 목록을 불러오는 중 오류 발생:", error);
      });
  }, [query, onLoad]);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 px-6 md:px-6 lg:px-40 mb-10">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ProductList;
