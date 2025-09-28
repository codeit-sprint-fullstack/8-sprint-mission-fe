import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[1000] h-[var(--header-height)] w-full border-b border-b-gray-200 bg-white px-[1.15rem]">
            <div className="mx-40 flex h-[var(--header-height)] max-w-[120rem] items-center justify-between">
                <div className="flex items-center gap-[3.125rem]">
                    <Link href="/" aria-label="판다마켓 홈으로 이동">
                        <Image
                            src="/img_panda_logo.svg"
                            alt="판다마켓 로고"
                            width={122}
                            height={26}
                        />
                    </Link>
                    <nav
                        className="flex items-center gap-[3.125rem]"
                        aria-label="주요 메뉴"
                    >
                        <Link
                            href="/board"
                            aria-label="자유게시판으로 이동"
                            className="cursor-pointer text-[1.2rem] font-bold text-gray-600 hover:underline"
                        >
                            자유게시판
                        </Link>
                        <Link
                            href="/items"
                            aria-label="중고마켓으로 이동"
                            className="cursor-pointer text-[1.2rem] font-bold text-gray-600 hover:underline"
                        >
                            중고마켓
                        </Link>
                    </nav>
                </div>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-[0.57rem] bg-[#3692ff] px-[1.65rem] py-[0.72rem] text-[1.15rem] font-semibold text-white hover:bg-[#1967d6] focus:bg-[#1251aa]"
                >
                    로그인
                </Link>
            </div>
        </header>
    );
}
