import React from "react";
import { Heart, Code } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="bg-[#1e2228] text-white fixed bottom-0 left-0 right-0 h-[65px] flex items-center justify-between border-t border-[#3a404d] px-4 sm:px-8 shadow-inner-top">
    <p className="text-xs text-white/70">© 2025 Your Name. All Rights Reserved.</p>
    <div className="flex items-center space-x-1 text-xs text-white/60">
      <span>Made with</span>
      <Heart className="w-3 h-3 text-red-500 animate-pulse" />
      <span>and</span>
      <Code className="w-3 h-3 text-[#6ee7b7]" />
    </div>
  </footer>
);

export default Footer;
