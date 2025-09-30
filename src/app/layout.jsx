import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "판다마켓",
    description: "판다마켓 중고시장 서비스",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
