import type { Metadata } from 'next';

import Providers from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

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
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
