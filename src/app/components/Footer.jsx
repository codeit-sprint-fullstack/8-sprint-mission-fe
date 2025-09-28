"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-base px-[200px] py-8 flex flex-wrap justify-between items-center gap-16 md:px-6 sm:px-4">
      {/* 저작권 */}
      <p className="w-full md:w-auto text-gray-400 order-3 md:order-0">
        © codeit - 2024
      </p>

      {/* 메뉴 링크 */}
      <div className="flex gap-7.5 sm:gap-4">
        <a href="/privacy" className="hover:text-blue-500">
          Privacy Policy
        </a>
        <a href="/faq" className="hover:text-blue-500">
          FAQ
        </a>
      </div>

      {/* SNS 아이콘 */}
      <div className="flex gap-3">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.svg" alt="페이스북" className="w-5 h-5 object-contain" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/twitter.svg" alt="트위터" className="w-5 h-5 object-contain" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/youtube.svg" alt="유튜브" className="w-5 h-5 object-contain" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.svg" alt="인스타그램" className="w-5 h-5 object-contain" />
        </a>
      </div>
    </footer>
  );
}
