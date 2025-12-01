import Image from 'next/image';

const SocialLogin = () => {
  return (
    <div className="mt-2 p-3 bg-[var(--cool-gray)] rounded-lg flex items-center justify-between">
      <span className="text-base font-medium ml-2">간편 로그인하기</span>
      <div className="flex gap-2 sm:gap-3">
        <a href="https://www.google.com/" aria-label="구글 로그인">
          <Image
            src="/images/icon/ic_google.svg"
            alt="Google"
            width={40}
            height={40}
            className="inline-block mr-2"
          />
        </a>
        <a href="https://www.kakaocorp.com/page/" aria-label="카카오 로그인">
          <Image
            src="/images/icon/ic_kakao.svg"
            alt="Kakao"
            width={40}
            height={40}
            className="inline-block mr-2"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
