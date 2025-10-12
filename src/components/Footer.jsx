import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{ backgroundColor: 'var(--gray-900)', color: 'var(--gray-400)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex justify-between items-center space-y-6">
          {/* 카피라이트 */}
          <div className="text-sm">©codeit - 2024</div>

          {/* 링크들 */}
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* 소셜 아이콘들 */}
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80 overflow-hidden"
            >
              <Image src="/images/icon/ic_facebook.svg" alt="Facebook" width={24} height={24} />
            </Link>
            <Link
              href="https://www.twitter.com"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80 overflow-hidden"
            >
              <Image src="/images/icon/ic_twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link
              href="https://www.youtube.com"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80 overflow-hidden"
            >
              <Image src="/images/icon/ic_youtube.svg" alt="YouTube" width={24} height={24} />
            </Link>
            <Link
              href="https://www.instagram.com"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80 overflow-hidden"
            >
              <Image src="/images/icon/ic_instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
