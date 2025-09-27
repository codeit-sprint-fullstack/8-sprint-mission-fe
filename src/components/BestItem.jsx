import React from "react";
import Image from "next/image";

export default function BestItem({ item }) {
  const likes = Number(item.likes || 0);
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : '';
  return (
    <div className="rounded-lg px-4 pt-0 pb-2 hover:shadow-md transition-shadow cursor-pointer" style={{backgroundColor: 'var(--gray-50)'}}>
      <span className="inline-block text-white text-xs font-semibold px-6 py-1 rounded-b-2xl mb-3" style={{backgroundColor: 'var(--primary-100)'}}>
        <Image src="/images/icon/ic_medal.svg" alt="Best Icon" width={12} height={12} className="inline-block mr-1" />
        Best
      </span>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-medium mb-2 line-clamp-2" style={{color: 'var(--gray-900)'}}>
            {item.title}
          </h3>
          <p className="text-sm mb-1" style={{color: 'var(--gray-600)'}}>{item.price}</p>
          <p className="text-xs" style={{color: 'var(--gray-500)'}}>{createdAt}</p>
        </div>
        <div className="w-16 h-16 rounded-lg flex p-1 justify-center items-center" style={{border: '1px solid var(--gray-100)', backgroundColor: 'var(--background)'}}>
          <Image
            src={item.image || "/images/sample/img_sample1.png"}
            alt={item.title}
            width={45}
            height={45}
          />
        </div>
      </div>
      <div className="flex items-center text-xs text-gray-500">
  <span>♥ {likes.toLocaleString()}</span>
      </div>
    </div>
  );
}
