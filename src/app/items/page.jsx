"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BestProductSection from "@/components/Items/BestProductSection";
import ProductCard from "@/components/Items/ProductCard";
import ProductListController from "@/components/Items/ProductListController";
import PageButton from "@/components/Items/PageButton";
import { useItems } from "@/hooks/useItems";

const ItemPage = () => {
  const { items: products, loading, error, loadItems } = useItems();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const bestProducts = [...products]
    .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <BestProductSection
          bestProducts={bestProducts}
          loading={loading}
          error={error}
        />

        <section>
          <ProductListController
            controls={{ search: true, orderBy: true }}
            option={{ search: true, orderBy: true, upload: true }}
            products={products}
            setSortedProducts={setSortedProducts}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {loading && (
              <div className="col-span-full text-center py-10 text-gray-400">
                상품 목록을 불러오는 중입니다...
              </div>
            )}

            {error && (
              <div className="col-span-full text-center py-10 text-gray-400">
                Error: {error}
              </div>
            )}

            {!loading &&
              !error &&
              (sortedProducts?.length > 0 ? (
                (sortedProducts ?? []).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    {...product}
                    type="normal"
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-400">
                  상품이 없습니다.
                </div>
              ))}
          </div>
          <PageButton
            nowPage={nowPage}
            pageSize={pageSize}
            totalCount={100}
            onChange={setNowPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ItemPage;
