// src/components/SearchBar.jsx
import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const t = setTimeout(() => onSearch(text.trim()), 400);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <input
      placeholder="상품 검색..."
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
