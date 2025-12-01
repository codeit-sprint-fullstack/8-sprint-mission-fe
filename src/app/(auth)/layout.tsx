import { PropsWithChildren } from 'react';
import { AuthLayout } from '@/components/Layout';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
