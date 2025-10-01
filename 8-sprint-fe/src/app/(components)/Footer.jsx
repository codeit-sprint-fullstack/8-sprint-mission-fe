import React from "react";

import ic_facebook from "/public/ic_facebook.svg";
import ic_twitter from "/public/ic_twitter.svg";
import ic_instagram from "/public/ic_instagram.svg";
import ic_youtube from "/public/ic_youtube.svg";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const sns_style = "";
  return (
    <footer className="bg-gray-900 w-full h-40 px-50 py-8 mt-20">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">©codeit - 2024</span>
        <div className="flex gap-7.5">
          <span className="text-gray-200">Privacy Policy</span>
          <span className="text-gray-200">FAQ</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="https://www.facebook.com/">
            <Image src={ic_facebook} alt="facebook_icon" />
          </Link>
          <Link href="https://www.x.com/">
            <Image src={ic_twitter} alt="twitter_icon" />
          </Link>
          <Link href="https://www.instagram.com/">
            <Image src={ic_instagram} alt="instagram_icon" />
          </Link>
          <Link href="https://www.youtube.com/">
            <Image src={ic_youtube} alt="youtube_icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
