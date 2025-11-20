import AuthEntry from '@/components/features/auth/AuthEntry';
import AuthForm from '@/components/features/auth/AuthForm';
import SocialLogin from '@/components/features/auth/SocialLogin';
import Image from 'next/image';
import Link from 'next/link';

const AuthTemplate = ({ type = 'login' }: { type: 'login' | 'signup' }) => {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-10 pt-[231px] pb-[284px]">
      <Link href="/">
        <Image src="/brandLogo_lg.svg" alt="brandLogo" width={396} height={132} />
      </Link>
      <div className="w-full">
        <AuthForm type={type} />
        <SocialLogin />
        <AuthEntry type={type} />
      </div>
    </div>
  );
};

export default AuthTemplate;
