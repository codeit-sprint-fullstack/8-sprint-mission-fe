import React from 'react';
import Image from 'next/image';
import { Article } from '@/types';

interface PostItemProps {
  item: Article;
}

export default function PostItem({ item }: PostItemProps) {
  const likes = Number(item.favoriteCount || 0);
  const author = item.writer?.nickname || '익명';
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : '';

  return (
    <div
      className="flex flex-col gap-[16px] border-b pb-6 hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderColor: 'var(--gray-200)', backgroundColor: '#fcfcfc' }}
    >
      <div className="flex flex-row justify-between ">
        <h3 className="font-medium mb-2" style={{ color: 'var(--gray-900)' }}>
          {item.title}
        </h3>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-[8px]" style={{ color: 'var(--gray-500)' }}>
          <span>
            <Image src="/images/icon/ic_profile.svg" alt="Author Avatar" width={24} height={24} />
          </span>
          <span>{author}</span>
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--gray-500)' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={item.isFavorite ? '#dc2626' : 'none'}
            stroke={item.isFavorite ? '#dc2626' : 'currentColor'}
            strokeWidth="1.8"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span>{likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
