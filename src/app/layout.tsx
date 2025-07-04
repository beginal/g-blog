import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// 임시 비활성화: 인증 컨텍스트
// TODO: 인증 시스템 재활성화 시 주석 해제
// import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "My Portfolio & Blog",
  description: "A personal portfolio and blog built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-pretendard antialiased">
        {/* 임시 비활성화: AuthProvider */}
        {/* <AuthProvider> */}
        <Header />
        <main className="pt-[70px] pb-[70px] min-h-screen flex flex-col items-center bg-[#262b33] text-white">
          <div className="container mx-auto p-4 sm:p-6 lg:p-4 w-full">{children}</div>
        </main>
        <Footer />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
