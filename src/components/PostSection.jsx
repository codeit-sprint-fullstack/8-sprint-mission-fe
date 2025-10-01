import React from "react";
import Button from "@/components/Button";
import SearchAndSort from "@/components/SearchAndSort";
import PostItem from "@/components/PostItem";
import { useRouter } from "next/navigation";

export default function PostSection({ items, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/article/${id}`);
  }

  return (
    <section className="bg-white py-12 border-t" style={{borderColor: 'var(--gray-200)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{color: 'var(--gray-900)'}}>게시판</h2>
          <Button appearance="primary" className="text-sm" onClick={() => handleClick('edit')}>
            글쓰기
          </Button>
        </div>

        <SearchAndSort 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>
              <PostItem key={item.id} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
