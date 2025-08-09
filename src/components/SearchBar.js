import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const id = setTimeout(() => onSearch(term.trim()), 300);
    return () => clearTimeout(id);
  }, [term, onSearch]);

  return (
    <div className="search">
      <img src="/images/ic_search.svg" alt="Facebook" />
      <input
        placeholder="검색할 상품을 입력해주세요"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
}
