import ProductCard from '../ProductCard/ProductCard';
import './BestProductList.css';

function BestProductList() {
  return (
    <section className="best-product-list">
      <h2>베스트 상품</h2>
      <div className="product-cards">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProductList;