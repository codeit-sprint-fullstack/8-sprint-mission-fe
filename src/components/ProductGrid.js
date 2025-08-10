import ProductCard from './ProductCard';

export default function ProductGrid({ items }) {
  if (!Array.isArray(items)) return null;
  return (
    <section>

      <div className="productGrid">
        {items.map((p) => (
          <div key={p.id} className="gridItem">
            <ProductCard item={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
