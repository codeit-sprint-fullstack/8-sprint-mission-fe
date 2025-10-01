import React from 'react';
import ProductCard from './ProductCard';

import '../styles/ProductList.css';


function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} className="small" />
      ))}
    </div>
  );
}

export default ProductList;