import Link from 'next/link';

const AuthEntry = ({ type = 'login' }: { type: 'login' | 'signup' }) => {
  const linkMap = {
    login: '/auth/signup',
    signup: '/auth/login',
  };

  const textMap = {
    login: '판다마켓이 처음이신가요?',
    signup: '이미 회원이신가요?',
  };

  const btnMap = {
    login: '회원가입',
    signup: '로그인',
  };

  return (
    <div className="flex w-full items-center justify-center gap-1">
      <div className="text-secondary-800 text-sm leading-[24px] font-medium">{textMap[type]}</div>
      <Link
        href={linkMap[type]}
        className="text-primary-100 decoration-underline cursor-pointer text-sm font-medium decoration-solid"
      >
        {btnMap[type]}
      </Link>
    </div>
  );
};

export default AuthEntry;
