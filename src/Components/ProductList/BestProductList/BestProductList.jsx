import ProductCard from '../ProductCard/ProductCard';
import './BestProductList.css';

function BestProductList({ products }) {
  return (
    <section className="bestProduct">
      <h2>베스트 상품</h2>

      <div className="bestProductCards">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProductList;