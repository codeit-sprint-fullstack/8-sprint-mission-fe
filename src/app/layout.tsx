import type { Metadata } from 'next';

import Providers from './providers';
import AuthBootstrapper from '@/components/common/AuthBootstrapper';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { AppToaster } from '@/components/common/Sonner';

import './globals.css';

export const metadata: Metadata = {
  title: '판다마켓',
  description: '판다마켓',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <AuthBootstrapper />
          <Header />
          {children}
          <Footer />
        </Providers>
        <AppToaster />
      </body>
    </html>
  );
}
