import React from 'react';

const Header: React.FC<{ onHomeClick: () => void }> = ({ onHomeClick }) => (
  <header className="bg-[#2c313a]/90 backdrop-blur-lg text-white fixed top-0 left-0 right-0 h-[70px] flex items-center justify-between px-8 shadow-md z-10 border-b border-[#3a404d]">
    <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={onHomeClick}>
      My Portfolio & Blog
    </h1>
    <nav className="space-x-6">
      <a href="#" onClick={onHomeClick} className="hover:text-white/80 transition-colors">
        Home
      </a>
    </nav>
  </header>
);

export default Header;
