import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";

// 한글 전용 Pretendard GOV Variable
const pretendardGOV = localFont({
  src: "../../public/fonts/PretendardGOVVariable.woff2",
  variable: "--font-pretendard-gov",
  display: "swap", // 폰트 깜빡임 최소화
});

const pretendardStd = localFont({
  src: "../../public/fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard-std",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${pretendardGOV.variable} ${pretendardStd.variable}`}
    >
      <body>
        <Header />
        <main className="px-4">
          <div className="max-w-300 mx-auto mt-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
