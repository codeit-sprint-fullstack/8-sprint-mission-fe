"use client";

import Image from "next/image";

export default function BestPostCard({ post, onClick }) {
    return (
        <div
            className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 cursor-pointer"
            onClick={onClick}
        >
            <Image
                src="/img_best_badge.svg"
                alt="베스트 배지"
                width={48}
                height={48}
                className="absolute top-0 left-5 select-none"
                aria-hidden="true"
            />

            <h3 className="text-lg font-semibold text-gray-800 truncate mb-3">
                {post.title}
            </h3>
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    <span>{post.author}</span>
                    <div className="flex items-center mt-1">
                        <Image
                            src="/btn_heart_inactive.svg"
                            alt="좋아요"
                            width={16}
                            height={16}
                            className="mr-1"
                        />
                        <span>{post.likes}</span>
                        <span className="mx-2">·</span>
                        <span>{post.date}</span>
                    </div>
                </div>
                <img
                    src={post.imageUrl || "/img_home_hot_item.svg"}
                    alt="Post thumbnail"
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "/img_home_hot_item.svg";
                    }}
                />
            </div>
        </div>
    );
}
