"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPosts, getBestPosts } from "@/lib/posts";


export default function FreeboardListPage() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [best, setBest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setErr("");
      setLoading(true);

      const [listRes, bestRes] = await Promise.all([
        getPosts({ page: 1, limit: 4, sort, keyword }),
        getBestPosts(),
      ]);

      const listItems = Array.isArray(listRes) ? listRes : (listRes?.items ?? listRes?.data ?? []);
      const bestItems = Array.isArray(bestRes) ? bestRes : (bestRes?.items ?? bestRes?.data ?? []);

      setPosts(listItems.slice(0, 4));
      setBest(bestItems.slice(0, 3));
    } catch {
      setErr("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [sort]);

  const onSearch = (e) => {
    e.preventDefault();
    load();
  };

  return (
    <main className="mx-auto px-[360px]">
      <section className="mt-6">
        <h2 className="mb-6 text-[20px] font-bold">베스트 게시글</h2>

        <ul className="grid grid-cols-[repeat(3,384px)] justify-between gap-y-4">
          {best.map((p) => (
            <li
            key={p.id}
            className="relative w-[384px] h-[169px] rounded-[8px] border border-[#f9fafb] bg-white shadow-sm transition hover:shadow overflow-hidden"
          >
            <Link href={`/freeboard/${p.id}`} className="block h-full">

              <div className="relative h-[153px] px-6 bg-[#f9fafb]">
                <div className="h-[30px]">
                  <span className="inline-flex h-[30px] w-[102px] items-center gap-1 rounded-b-[16px] bg-[#3692ff] px-6 py-[2px]">
                    <img src="/images/icon-medal.svg" alt="" className="h-4 w-4" aria-hidden="true" />
                    <span className="text-white text-[16px] font-semibold leading-none">Best</span>
                  </span>
                </div>
          
                <div className="mt-[16px]">
                  <div className="grid h-[72px] w-[336px] grid-cols-[256px_72px] items-start gap-x-2">
                    <div className="h-[64px] w-[256px] overflow-hidden">
                      <p className="text-[20px] font-semibold leading-[32px] text-[#1F2937] whitespace-pre-line break-words">
                        맥북 16인치 16기가 1테라 정도
                        <br />
                        사양이면 얼마에 팔아야하나요?
                      </p>
                    </div>

                    <div className="h-[72px] w-[72px] rounded-[6px] outline outline-1 outline-[#E5E7EB] px-[12px] py-[14px] bg-white flex items-center justify-center">
                      <Image
                        src="/images/best-img.svg"
                        alt=""
                        width={48}
                        height={43}
                        className="h-[43px] w-[48px] object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="absolute left-6 right-6 top-[136px] flex items-center justify-between text-[14px] font-normal leading-none">
                    <span className="flex items-center gap-2">
                      <span className="text-[#4b5563]">{p.nickname}</span>
                      <span className="text-[#6b7280]">♥ {p.likes}</span>
                    </span>
                    <span className="text-[#9ca3af]">
                      {(p.createdAt ? p.createdAt.slice(0, 10).replaceAll("-", ".") : "0000.00.00")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 mb-[293px]">
        <div className="mb-6 flex items-center">
          <h3 className="text-[20px] font-bold">게시글</h3>
          <Link
            href="/freeboard/new"
            className="
              ml-auto inline-flex items-center justify-center
              h-[42px] min-w-[88px]
              rounded-[8px] bg-[#3692ff]
              px-[23px] py-[12px]
              text-[16px] font-semibold leading-[18px] text-white"
          >
            글쓰기
          </Link>
        </div>

        <form onSubmit={onSearch} className="mb-3 flex items-center">
          <div className="relative w-[1024px] h-[42px]">
            <img
              src="/images/search-icon.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
            />

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"
              className="
                h-[42px] w-full rounded-[12px] border-0
                bg-[#F3F4F6] text-[16px] font-normal text-[#9CA3AF]
                placeholder:text-[#9CA3AF] placeholder:text-[16px] placeholder:font-normal
                px-[16px] pl-[44px]
                outline-none"
            />
          </div>

          <div className="ml-auto relative w-[130px]">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                h-[42px] w-[130px]
                appearance-none
                rounded-[12px] border border-gray-300 bg-white
                pl-[20px] pr-[44px]
                py-[12px]
                text-[16px] font-normal text-[#1F2937]
                leading-[18px]
                outline-none
              "
            >
              <option value="latest">최신순</option>
            </select>

            <span className="pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2">
              <img
                src="/images/arrow-down.svg"
                alt=""
                className="h-4 w-4"
                aria-hidden="true"
              />
            </span>
          </div>
        </form>

        {loading ? (
          <p className="text-sm text-gray-500">로딩 중…</p>
        ) : err ? (
          <p className="text-sm text-red-600">{err}</p>
        ) : (
          <ul className="flex flex-col">
            {posts.map((p) => {
              const thumb = p.imageUrl || p.image || p.thumb || DEFAULT_POST_THUMB;
              return (
                <li
                  key={p.id}
                  className="h-[138px] rounded-[8px] border border-[#F3F4F6] bg-[#FCFCFC] px-0 pt-0 pb-0 mb-6 last:mb-auto transition hover:shadow-sm"
                >
                  <Link
                    href={`/freeboard/${p.id}`}
                    className="
                      grid h-full
                      grid-cols-[minmax(0,1fr)_72px]
                      items-start
                      gap-2
                    "
                  >
                    
                    <div className="min-w-0">
                      <h4 className="h-[64px] overflow-hidden text-ellipsis text-[20px] font-semibold leading-[32px] text-[#1F2937] line-clamp-2">
                        {p.title}
                      </h4>
                    </div>

                    <div className="h-[72px] w-[72px] shrink-0 rounded-[8px] bg-white outline outline-1 outline-[#F3F4F6] overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/best-img.svg"
                        alt="게시글 썸네일"
                        width={48}
                        height={45}
                        className="h-[45px] w-[48px] object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="col-span-2 mt-4 mb-6 h-[26px] flex items-center text-[14px] leading-[26px]">
                      <div className="flex items-center text-gray-500">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/images/ic-user.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6"
                            unoptimized
                          />
                          <span className="text-[#4B5563]">{p.nickname}</span>
                        </div>
                        <span className="mx-3 text-[#D1D5DB]">•</span>
                        <span className="text-[#9CA3AF]">
                          {p.createdAt?.slice(0, 10)?.replaceAll("-", ".") ?? "0000.00.00"}
                        </span>
                      </div>
                      
                      <div className="ml-auto inline-flex items-center gap-1 text-[#6B7280]">
                        <span aria-hidden="true">♥</span>
                        <span>{p.likes ?? 0}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
