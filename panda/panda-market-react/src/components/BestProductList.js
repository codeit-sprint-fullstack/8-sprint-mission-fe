import React from 'react';
import ProductCard from './ProductCard';


const BestProductList = ({ products }) => {
  return (
    <section className="best-product-section">
      <h2 className="section-title">베스트 상품</h2>
      <div className="best-product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};


export default BestProductList;