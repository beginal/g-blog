"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Heart, Code } from "lucide-react";
import { COLORS } from "@/config/constants";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  if (isAboutPage) {
    return null;
  }

  return (
    <footer
      className="text-white fixed bottom-0 left-0 right-0 h-[65px] flex items-center justify-between border-t px-4 sm:px-8 shadow-inner-top"
      style={{
        backgroundColor: COLORS.surfaceDark,
        borderTopColor: COLORS.surfaceLight,
      }}
    >
      <p className="text-xs text-white/70">© 2025 Beginal. All Rights Reserved.</p>
      <div className="flex items-center space-x-1 text-xs text-white/60">
        <span>Made with</span>
        <Heart className="w-3 h-3 text-red-500 animate-pulse" />
        <span>and</span>
        <Code className="w-3 h-3" style={{ color: COLORS.primary }} />
      </div>
    </footer>
  );
};

export default Footer;
