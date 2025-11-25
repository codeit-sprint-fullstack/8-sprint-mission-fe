import { DefaultLayout } from '@/components/Layout';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
