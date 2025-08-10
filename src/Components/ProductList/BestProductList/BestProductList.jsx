import ProductCard from '../ProductCard/ProductCard';
import style from './BestProductList.css';

function BestProductList({ products }) {
  return (
    <section className={style.bestProduct}>
      <h2>베스트 상품</h2>

      <div className={style.bestProductList}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProductList;