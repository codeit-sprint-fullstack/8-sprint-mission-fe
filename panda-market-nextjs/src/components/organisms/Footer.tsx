import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="w-full px-80 py-8 pb-28 mx-auto flex justify-between items-center max-xl:px-6 max-xl:pb-20 max-md:flex-wrap max-md:gap-6 max-md:px-4 max-md:pb-16">
        <p className="text-sm text-gray-400 max-md:order-1 max-md:flex-1">
          ©codeit - 2025
        </p>
        <nav className="flex gap-8">
          <Link
            href="/privacy"
            className="text-sm text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="text-sm text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex gap-3">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="페이스북으로 이동"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer/footer-icon-01.svg"
              alt="페이스북 아이콘"
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="트위터로 이동"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer/footer-icon-02.svg"
              alt="트위터 아이콘"
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="유튜브로 이동"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer/footer-icon-03.svg"
              alt="유튜브 아이콘"
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="인스타그램으로 이동"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer/footer-icon-04.svg"
              alt="인스타그램 아이콘"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
