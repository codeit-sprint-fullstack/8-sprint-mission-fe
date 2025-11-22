import Image from 'next/image';
import facebookLogo from '@/images/footer/facebook-logo.svg';
import twitterLogo from '@/images/footer/twitter-logo.svg';
import youtubeLogo from '@/images/footer/youtube-logo.svg';
import instagramLogo from '@/images/footer/instagram-logo.svg';

export default function HomeFooter() {
  return (
    <footer className="flex h-[164px] w-full flex-col gap-[8px] bg-[var(--Cool-Gray-900)] p-[32px]">
      <div className="flex items-center justify-between">
        <div className="hidden text-[var(--Secondary-400)] md:block">©codeit - 2024</div>
        <div className="flex gap-[30px] text-[var(--gray-200)]">
          <a>Privacy Policy</a>
          <a>FAQ</a>
        </div>
        <div className="flex gap-[12px]">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북" //aira-label은 카멜케이스를 안 쓰네요;;
          >
            <Image src={facebookLogo} alt="페이스북" width="20" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <Image src={twitterLogo} alt="트위터" width="20" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <Image src={youtubeLogo} alt="유튜브" width="20" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <Image src={instagramLogo} alt="인스타그램" width="20" />
          </a>
        </div>
      </div>
      <div className="block text-[var(--Secondary-400)] md:hidden">©codeit - 2024</div>
    </footer>
  );
}
