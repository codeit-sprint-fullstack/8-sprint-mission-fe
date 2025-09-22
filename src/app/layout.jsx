import "./globals.css";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
