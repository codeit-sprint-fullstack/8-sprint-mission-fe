// src/components/ProductGrid.jsx
import ProductCard from './ProductCard';

export default function ProductGrid({ items, columns }) {
  return (
    <div
      className="grid"
      style={{ 
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {items.map(item => <ProductCard key={item.id} product={item} />)}
    </div>
  );
}
