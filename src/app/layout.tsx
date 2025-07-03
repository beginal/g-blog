import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "My Portfolio & Blog",
  description: "A personal portfolio and blog built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-[70px] pb-[70px] min-h-screen flex flex-col items-center justify-center bg-[#262b33] text-white">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 w-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
