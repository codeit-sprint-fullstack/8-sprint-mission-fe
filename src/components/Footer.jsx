import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer
            className="flex items-center justify-between bg-gray-900 px-[20rem] 
            pt-[2rem] pb-[4.5rem] text-base text-gray-400"
        >
            <div>@codeit - 2024</div>
            <div className="flex gap-12 text-gray-200">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/faq">FAQ</Link>
            </div>
            <div className="flex gap-[1.2rem]">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="페이스북"
                >
                    <Image
                        src="/ic_facebook.svg"
                        alt="페이스북"
                        width={18}
                        height={19}
                    />
                </a>
                <a
                    href="https://www.x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="트위터"
                >
                    <Image
                        src="/ic_twitter.svg"
                        alt="트위터"
                        width={20}
                        height={20}
                    />
                </a>
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="유튜브"
                >
                    <Image
                        src="/ic_youtube.svg"
                        alt="유튜브"
                        width={20}
                        height={20}
                    />
                </a>
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="인스타그램"
                >
                    <Image
                        src="/ic_instagram.svg"
                        alt="인스타그램"
                        width={20}
                        height={20}
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
