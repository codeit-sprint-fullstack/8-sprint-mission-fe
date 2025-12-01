import React from 'react';
import Image from 'next/image';

interface SortOption {
  value: string;
  label: string;
}

interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  placeholder?: string;
  sortOptions?: SortOption[];
}

export default function SearchAndSort({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  placeholder = '검색어를 입력해주세요',
  sortOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'likes', label: '인기순' },
  ],
}: SearchAndSortProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image src="/images/icon/ic_search.svg" alt="Search" width={24} height={24} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
          style={{ backgroundColor: 'var(--gray-100)' }}
        />
      </div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:border-transparent appearance-none bg-white cursor-pointer width-full"
          style={{ borderColor: 'var(--gray-200)' }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Image src="/images/icon/ic_arrow_down.svg" alt="Arrow Down" width={16} height={16} />
        </div>
      </div>
    </div>
  );
}
