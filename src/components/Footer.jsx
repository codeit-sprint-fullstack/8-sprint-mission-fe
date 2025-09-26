import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between px-[25rem] py-[2rem] bg-[var(--Secondary-900,#111827)] text-center font-[Pretendard] text-base font-normal leading-normal text-[var(--Secondary-400,#9CA3AF)]">
      <p className="">@codeit-2024</p>
      <div className="flex gap-2">
        <Link href="/privacy">Privacy Polic</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div className="flex gap-2">
        {/*페북-트위-ㅇ튜-인스 */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="object-cover"
            src="/ic_facebook.png"
            alt="facebook"
            width={20}
            height={20}
          ></Image>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image
            className="object-cover"
            src="/ic_twitter.png"
            alt="twitter"
            width={20}
            height={20}
          ></Image>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Image
            className="object-cover"
            src="/ic_youtube.png"
            alt="youtube"
            width={20}
            height={20}
          ></Image>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="object-cover"
            src="/ic_instagram.png"
            alt="instagram"
            width={20}
            height={20}
          ></Image>
        </a>
      </div>
    </div>
  );
};

export default Footer;
