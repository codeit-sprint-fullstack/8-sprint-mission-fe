import React from 'react';
import Image from 'next/image';

export default function BestItem({ item }) {
  const likes = Number(item.favoriteCount || 0);
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : '';
  return (
    <div
      className="rounded-lg px-4 pt-0 pb-2 hover:shadow-md transition-shadow cursor-pointer"
      style={{ backgroundColor: 'var(--gray-50)' }}
    >
      <span
        className="inline-block text-white text-xs font-semibold px-6 py-1 rounded-b-2xl mb-3"
        style={{ backgroundColor: 'var(--primary-100)' }}
      >
        <Image
          src="/images/icon/ic_medal.svg"
          alt="Best Icon"
          width={12}
          height={12}
          className="inline-block mr-1"
        />
        Best
      </span>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-medium mb-2 line-clamp-2" style={{ color: 'var(--gray-900)' }}>
            {item.title}
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--gray-600)' }}>
            {item.price}
          </p>
          <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
            {createdAt}
          </p>
        </div>
        <div
          className="w-16 h-16 rounded-lg flex p-1 justify-center items-center"
          style={{ border: '1px solid var(--gray-100)', backgroundColor: 'var(--background)' }}
        >
          <Image
            src={item.image || '/images/sample/img_sample1.png'}
            alt={item.title}
            width={45}
            height={45}
          />
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={item.isLiked ? '#dc2626' : 'none'}
          stroke={item.isLiked ? '#dc2626' : 'currentColor'}
          strokeWidth="1.8"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <span> {likes.toLocaleString()} </span>
      </div>
    </div>
  );
}
