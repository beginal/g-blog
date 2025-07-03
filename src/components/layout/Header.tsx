import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => (
  <header className="bg-[#2c313a]/90 backdrop-blur-lg text-white fixed top-0 left-0 right-0 h-[70px] flex items-center justify-between px-8 shadow-md z-10 border-b border-[#3a404d]">
    <Link href="/" className="text-2xl font-bold text-white cursor-pointer">
      My Portfolio & Blog
    </Link>
    <nav className="space-x-6">
      <Link href="/" className="hover:text-white/80 transition-colors">
        Home
      </Link>
    </nav>
  </header>
);

export default Header;
