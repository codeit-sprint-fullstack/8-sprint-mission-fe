"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ItemsPage() {
  const router = useRouter();
  const qc = useQueryClient();


  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (!t) router.replace("/login");
  }, [router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page: 1, pageSize: 12, orderBy: "recent" }],
    queryFn: () => getProducts({ page: 1, pageSize: 12, orderBy: "recent" }),
  });


  const list = data?.list ?? [];

  if (isLoading) {
    return <main className="max-w-5xl mx-auto p-4">로딩 중…</main>;
  }
  if (isError) {
    return (
      <main className="max-w-5xl mx-auto p-4">
        <p className="text-red-600">목록을 불러오지 못했습니다.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">중고마켓</h1>

      {list.length === 0 ? (
        <p className="text-gray-500">등록된 상품이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((item) => (
            <li key={item.id}>
              <Link
                href={`/items/${item.id}`}
                onMouseEnter={() => {
                  qc.prefetchQuery({
                    queryKey: ["product", item.id],
                    queryFn: () => getProduct(item.id),
                  });
                }}
                className="block rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm"
              >
                {item?.images?.[0] ? (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-100" />
                )}
                <div className="p-3">
                  <div className="text-sm text-gray-700 line-clamp-1">{item.name}</div>
                  <div className="mt-1 font-semibold">
                    {Number(item.price).toLocaleString()}원
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
