import type { Metadata } from 'next';
import './globals.css';
import { DeviceProvider } from '@/components/provider/DevicePorvider';

export const metadata: Metadata = {
  title: '판다 마켓',
  description: '일상의 모든 물건을 거래하는 중고 거래 사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
