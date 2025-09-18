import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex justify-center items-end w-[153px] h-[50px] mr-5 cursor-pointer"
    >
      <Image
        src="/image/logo_md.svg"
        alt="Logo"
        width={153}
        height={50}
        priority
      />
    </Link>
  );
};

export default Logo;
