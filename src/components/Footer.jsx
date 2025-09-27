import React from "react";

export default function Footer() {
  return (
    <footer className="py-12" style={{backgroundColor: 'var(--gray-900)', color: 'var(--gray-400)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* 카피라이트 */}
          <div className="text-sm">
            ©codeit - 2024
          </div>
          
          {/* 링크들 */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
          
          {/* 소셜 아이콘들 */}
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80" style={{backgroundColor: 'var(--gray-700)'}}>
              <span className="text-xs">f</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80" style={{backgroundColor: 'var(--gray-700)'}}>
              <span className="text-xs">t</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80" style={{backgroundColor: 'var(--gray-700)'}}>
              <span className="text-xs">y</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80" style={{backgroundColor: 'var(--gray-700)'}}>
              <span className="text-xs">i</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}