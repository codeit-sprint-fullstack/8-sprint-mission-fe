import Image from 'next/image';

const SocialLogin = () => {
  return (
    <div className="my-6 flex w-full items-center justify-between rounded-[8px] bg-[#E6F2FF] px-6 py-4">
      <div className="text-secondary-800 text-base leading-[26px] font-semibold">
        간편 로그인하기
      </div>
      <div className="flex gap-4">
        <Image src="/icons/ic_social/ic_google.svg" alt="ic_google" width={42} height={42} />
        <Image src="/icons/ic_social/ic_kakao.svg" alt="ic_kakao" width={42} height={42} />
      </div>
    </div>
  );
};

export default SocialLogin;
