import ProductCard from './ProductCard';

export default function BestProducts({ items }) {
  if (!Array.isArray(items)) return null;
  return (
    <section>
      <h3 className="bestTitle">베스트 상품</h3>
      <div className="bestGrid">
        {items.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}
