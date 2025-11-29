"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/Items/ProductCard";
import { BestProductSectionProps } from "@/types/entities";

const BestProductSection = ({
  bestProducts = [],
  loading,
  error,
}: BestProductSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 743) setVisibleCount(1); // 모바일
      else if (width < 1199) setVisibleCount(2); // 태블릿
      else setVisibleCount(4); // 데스크탑
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <section className="w-full">
      <h1 className="mb-6 text-xl text-gray-900 font-bold">베스트 상품</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && (
          <div className="col-span-full text-center py-10 text-gray-400">
            베스트 상품을 불러오는 중입니다...
          </div>
        )}

        {error && (
          <div className="col-span-full text-center py-10 text-gray-400">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {bestProducts.length > 0 ? (
              bestProducts
                .slice(0, visibleCount)
                .map((product) => (
                  <ProductCard key={product.id} product={product} type="best" />
                ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">
                베스트 상품이 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BestProductSection;
