import React, { useEffect, useState } from 'react';
import { getProductList } from '../api/ProductService';
import HotItem from '../components/HotItem';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getProductList();
        setItems(data);
      } catch (err) {
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="items-container">
      <h1>Available Items</h1>
      <div className="items-list">
        {items.map(item => (
          <HotItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Items;