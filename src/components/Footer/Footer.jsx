import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-start gap-2 shrink-0 h-40 py-8 px-4 sm:px-6 lg:px-[200px] bg-gray-900">
      <div className="flex justify-between items-center w-full flex-wrap">
        <p className="text-center text-base font-normal text-gray-400">
          @codeit - 2024
        </p>

        <div className="flex items-start gap-8">
          <Link
            href="/privacy"
            className="text-base font-normal text-gray-200 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="text-base font-normal text-gray-200 hover:underline"
          >
            FAQ
          </Link>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:scale-110 transition"
          >
            <Image
              src="/ic_facebook.svg"
              alt="Facebook"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:scale-110 transition"
          >
            <Image src="/ic_twitter.svg" alt="Twitter" width={20} height={20} />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:scale-110 transition"
          >
            <Image src="/ic_YouTube.svg" alt="YouTube" width={20} height={20} />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="w-5 h-5 hover:scale-110 transition"
          >
            <Image
              src="/ic_instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
