import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import Header from "@/components/organisms/Header";
import localFont from "next/font/local";
import { Footer } from "@/components/organisms/Footer";

const pretendard = localFont({
  src: "../../font/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "판다마켓",
  description: "일상에서 모든 물건을 거래해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${pretendard.variable}`}>
        <Header />
        <main className="px-[30px] pt-[30px] w-full mx-auto max-w-[1260px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
