import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 flex h-[160px] items-start justify-between px-[calc((100%-1200px)/2)] py-8">
      <div className="text-secondary-400 text-center text-base font-medium">©codeit - 2025</div>
      <div className="flex gap-[30px]">
        <div className="text-secondary-200 text-center text-base font-medium">Privacy Policy</div>
        <div className="text-secondary-200 text-center text-base font-medium">FAQ</div>
      </div>
      <div className="flex gap-3">
        <Image src="/icons/ic_social/ic_facebook.svg" alt="ic_facebook" width={20} height={20} />
        <Image src="/icons/ic_social/ic_twitter.svg" alt="ic_twitter " width={20} height={20} />
        <Image src="/icons/ic_social/ic_youtube.svg" alt="ic_youtube" width={20} height={20} />
        <Image src="/icons/ic_social/ic_instagram.svg" alt="ic_instagram" width={20} height={20} />
      </div>
    </footer>
  );
};

export default Footer;
