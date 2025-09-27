"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const MarketPage = () => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("latest");

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
  const defaultLike = 992;
  const defaultName = "총명한 판다";
  useEffect(() => {
    const ac = new AbortController();

    async function getarticles() {
      try {
        setLoading(true);
        setErrMsg("");
        const res = await fetch(`${BASE_URL}/articles`, {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setarticles(Array.isArray(data.list) ? data.list : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("목록을 불러오는 중 에러:", err);
          setErrMsg("목록을 불러오는 중 문제가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }

    getarticles();
    return () => ac.abort();
  }, [BASE_URL]);

  const getCreatedAt = (p) =>
    p?.createdAt || p?.created_at || p?.created_at?.value || p?.createdDate;

  const visibleList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? articles.filter((p) => {
          const title = (p?.name ?? p?.title ?? "").toLowerCase();
          return title.includes(q);
        })
      : articles.slice();

    filtered.sort((a, b) => {
      const ad = new Date(getCreatedAt(a) ?? 0).getTime();
      const bd = new Date(getCreatedAt(b) ?? 0).getTime();
      if (sortKey === "latest") return bd - ad;
      return ad - bd;
    });

    return filtered;
  }, [articles, search, sortKey]);

  const best3 = useMemo(() => visibleList.slice(0, 3), [visibleList]);

  if (loading) return <div className="p-4">불러오는 중…</div>;
  if (errMsg) return <div className="p-4 text-red-600">{errMsg}</div>;

  return (
    <div className="p-6 space-y-8 px-[22.5rem]  ">
      <section>
        <h2 className="font-semibold mb-3">베스트 게시글</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {best3.map((p) => (
            <Link key={p.id} href={`/board/${p.id}`} className="block">
              <article className="flex w-[384px] h-[169px] px-6 flex-col items-start gap-[10px] rounded-[8px] bg-[var(--Cool-Gray-50,#F9FAFB)]">
                <div className="flex w-[102px] py-[2px] px-6 justify-center items-center rounded-b-[16px] bg-[var(--brand-blue,#3692FF)] text-sm mb-1 text-white font-pretendard text-[16px] font-semibold leading-[26px] gap-1">
                  <Image
                    src="/ic_medal.svg"
                    alt="인증마크"
                    width={16}
                    height={16}
                  />
                  <span>best</span>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{p.title}</h3>
                  </div>

                  <div className="w-[72px] h-[72px] ml-auto">
                    <Image
                      src="/default.png"
                      alt="베스트 게시글 이미지"
                      width={72}
                      height={72}
                    />
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-3 w-full">
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1">
                      {defaultName}{" "}
                    </span>
                    <Image src="/ic_heart.svg" alt="" width={16} height={16} />
                    <span className="text-[11px] text-gray-400">
                      {defaultLike}
                    </span>
                  </div>
                  <span className="ml-auto pr-2">
                    {getCreatedAt(p)
                      ? new Date(getCreatedAt(p))
                          .toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\. /g, ".")
                          .replace(/\.$/, "")
                      : "날짜 없음"}
                  </span>
                </div>
              </article>
            </Link>
          ))}
          {best3.length === 0 && (
            <div className="text-sm text-gray-500">
              표시할 게시글이 없습니다.
            </div>
          )}
        </div>
      </section>

      <section className=" space-y-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">게시글</h1>
          <Link
            href="/post"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors "
          >
            글쓰기
          </Link>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"
              className="pl-10 pr-3 py-2 rounded-[12px] bg-[#F3F4F6] border-none w-full"
              aria-label="게시글 제목 검색"
            />
            <Image
              src="/ic_search.svg"
              alt=""
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <label className="flex items-center gap-2">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-md border bg-[#FCFCFC] border-gray-300 px-3 py-2 w-[8.125rem] h-[2.625rem] ;"
              aria-label="정렬 방식 선택"
            >
              <option value="latest">최신 순</option>
              <option value="oldest">오래된 순</option>
            </select>
          </label>
        </div>

        <div className="space-y-6 ">
          {visibleList.map((p) => (
            <Link key={p.id} className="block" href={`/board/${p.id}`}>
              <article className="flex w-full px-6 py-4 flex-col items-start gap-3 rounded-[8px] border border-gray-200 bg-[#FCFCFC]">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-2">{p.title}</h3>
                  </div>
                  <div className="w-[72px] h-[72px] flex-shrink-0">
                    <Image
                      src="/default.png"
                      alt="게시글 이미지"
                      width={72}
                      height={72}
                    />
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 mt-3 w-full">
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1">
                      {defaultName}{" "}
                      {getCreatedAt(p)
                        ? new Date(getCreatedAt(p))
                            .toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\. /g, ".")
                            .replace(/\.$/, "")
                        : "날짜 없음"}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Image src="/ic_heart.svg" alt="" width={24} height={24} />
                    <span className="text-[16px] text-gray-400">
                      {defaultLike}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {visibleList.length === 0 && (
            <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarketPage;
