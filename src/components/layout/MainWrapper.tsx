"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { COLORS } from "@/config/constants";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  return (
    <main 
      className={`pt-[70px] ${isAboutPage ? "" : "pb-[70px]"} min-h-screen flex flex-col items-center text-white`}
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-4 w-full">{children}</div>
    </main>
  );
};

export default MainWrapper;