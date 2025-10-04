import React from 'react';
import Image from 'next/image';

export default function PostItem({ item }) {
  const likes = Number(item.likes || 0);
  const author = item.author || item.nickname || '익명';
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
            <Image
              src={item.avatar || '/images/icon/ic_profile.svg'}
              alt="Author Avatar"
              width={24}
              height={24}
            />
          </span>
          <span>{author}</span>
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--gray-500)' }}>
          <Image src="/images/icon/ic_heart.svg" alt="좋아요" width={20} height={20} />
          <span>{likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
