"use client";

import React, { useState, useEffect, useMemo } from "react";
import BestPostCard from "./components/BestPostCard";
import PostItem from "./components/PostItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockBestPosts, mockPosts } from "./mockData";

export default function BoardPage() {
    const [bestPosts, setBestPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("최신순"); // 최신순 | 인기순 | 오래된순
    const router = useRouter();

    useEffect(() => {
        // mock 데이터 + 기본값 주입(닉네임/좋아요)
        const withDefaults = (arr) =>
            arr.map((p) => ({
                ...p,
                author: p.author || "익명",
                likes:
                    p.likes !== undefined && p.likes !== null
                        ? p.likes
                        : Math.floor(Math.random() * 200),
            }));
        setBestPosts(withDefaults(mockBestPosts));
        setPosts(withDefaults(mockPosts));
    }, []);

    // 문자열 날짜 파싱
    const parseDate = (s) => {
        if (!s) return new Date(0);
        try {
            const m = /^(\d{4})\.\s*(\d{2})\.\s*(\d{2})/.exec(s);
            if (!m) return new Date(0);
            const [_, y, mo, d] = m;
            return new Date(Number(y), Number(mo) - 1, Number(d));
        } catch {
            return new Date(0);
        }
    };
    const likesToNum = (v) => {
        if (typeof v === "number") return v;
        if (!v) return 0;
        const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
        return Number.isFinite(n) ? n : 0;
    };

    const displayedPosts = useMemo(() => {
        const q = search.trim().toLowerCase();
        let arr = posts;
        if (q) {
            arr = arr.filter((p) => p.title.toLowerCase().includes(q));
        }
        if (sort === "최신순") {
            return [...arr].sort(
                (a, b) => parseDate(b.date) - parseDate(a.date)
            );
        }
        if (sort === "오래된순") {
            return [...arr].sort(
                (a, b) => parseDate(a.date) - parseDate(b.date)
            );
        }
        if (sort === "인기순") {
            return [...arr].sort(
                (a, b) => likesToNum(b.likes) - likesToNum(a.likes)
            );
        }
        return arr;
    }, [posts, search, sort]);

    return (
        <div className="bg-white min-h-screen font-sans">
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* 베스트 게시글 */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        베스트 게시글
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bestPosts.map((post) => (
                            <BestPostCard
                                key={post.id}
                                post={post}
                                onClick={() => router.push(`/posts/${post.id}`)}
                            />
                        ))}
                    </div>
                </section>

                {/* 게시글 */}
                <section className="mt-12">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            게시글
                        </h2>
                        <button
                            onClick={() => (window.location.href = "/write")}
                            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            글쓰기
                        </button>
                    </div>
                    {/* 검색 및 필터 */}
                    <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="relative w-full max-w-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Image
                                    src="/img_search.svg"
                                    alt="검색"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="검색할 상품을 입력해주세요"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="최신순">최신순</option>
                            <option value="인기순">인기순</option>
                            <option value="오래된순">오래된순</option>
                        </select>
                    </div>

                    {/* 게시글 목록 */}
                    <div className="divide-y divide-gray-200">
                        {displayedPosts.map((post) => (
                            <PostItem
                                key={post.id}
                                post={post}
                                onClick={() => router.push(`/posts/${post.id}`)}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
