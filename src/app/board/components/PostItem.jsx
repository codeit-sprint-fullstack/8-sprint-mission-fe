"use client";
import Image from "next/image";

export default function PostItem({ post, onClick }) {
    return (
        <div
            className="py-5 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800">
                    {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                    <span>{post.author}</span>
                    <span className="mx-2">·</span>
                    <span>{post.date}</span>
                </div>
            </div>
            <div className="flex items-center ml-4 flex-shrink-0">
                <img
                    src={post.imageUrl || "/img_home_hot_item.svg"}
                    alt="Post thumbnail"
                    className="w-20 h-20 rounded-lg object-cover hidden sm:block"
                    onError={(e) => {
                        e.currentTarget.src = "/img_home_hot_item.svg";
                    }}
                />
                <div className="flex items-center text-gray-600 ml-6">
                    <Image
                        src="/btn_heart_inactive.svg"
                        alt="좋아요"
                        width={20}
                        height={20}
                        className="mr-1.5"
                    />
                    <span className="font-medium">{post.likes}</span>
                </div>
            </div>
        </div>
    );
}
