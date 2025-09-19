import Logo from "./Logo/Logo";
import Nav from "./Navigator/Navigator";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-[100] flex justify-center items-center w-full h-[70px] border-b border-[#DFDFDF] bg-white">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 lg:px-[200px]">
        <div className="flex justify-center items-end">
          <Logo />
          <Nav />
        </div>
        <Link
          href="/login"
          className="flex justify-center items-center bg-[#3692FF] rounded-lg w-22 h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap hover:underline"
        >
          로그인
        </Link>
      </nav>
    </header>
  );
};

export default Header;
