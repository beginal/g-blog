"use client";

import Link from "next/link";
import React, { useState } from "react";
import { COLORS } from "@/config/constants";
// 임시 비활성화: 인증 관련 기능
// TODO: 인증 시스템 재활성화 시 주석 해제
// import { useAuth } from "@/contexts/AuthContext";
// import { User, LogOut, Menu, X } from "lucide-react";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  // 임시 비활성화: 인증 상태
  // TODO: 인증 시스템 재활성화 시 주석 해제
  // const { user, loading, signOut } = useAuth();
  // const user = null; // 임시로 비로그인 상태로 설정
  // const loading = false;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 임시 비활성화: 로그아웃 핸들러
  /*
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  */

  return (
    <header 
      className="text-white fixed top-0 left-0 right-0 h-[55px] flex items-center justify-between px-4 sm:px-8 shadow-lg z-50 border-b"
      style={{
        backgroundColor: COLORS.background,
        borderBottomColor: COLORS.surfaceLight,
      }}
    >
      <Link href="/" className="cursor-pointer">
        {/* 임시 로고 이미지 (117px * 24px) */}
        <div
          style={{
            width: "117px",
            height: "24px",
            backgroundColor: COLORS.surfaceDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "12px",
          }}
        >
          LOGO
        </div>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-white/80 transition-colors">
          Home
        </Link>
        {/* 임시 비활성화: 로그인 상태에 따른 조건부 렌더링 */}
        <Link href="/posts/new" className="hover:text-white/80 transition-colors">
          New Post
        </Link>
        
        {/* 임시 비활성화: 인증 관련 UI
        {!loading && (
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="text-sm text-white/80">
                    {user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-1 bg-[#3a404d] hover:bg-[#4a505c] rounded-md transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#6ee7b7] text-black font-medium rounded-md hover:bg-[#5ad1a0] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
        */}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md transition-colors"
        style={{ 
          '--hover-bg': COLORS.surfaceLight 
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.surfaceLight;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden absolute top-[55px] left-0 right-0 border-b shadow-lg"
          style={{
            backgroundColor: COLORS.background,
            borderBottomColor: COLORS.surfaceLight,
          }}
        >
          <nav className="flex flex-col p-4 space-y-3">
            <Link 
              href="/" 
              className="hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {/* 임시 비활성화: 로그인 상태에 따른 조건부 렌더링 */}
            <Link 
              href="/posts/new" 
              className="hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              New Post
            </Link>
            
            {/* 임시 비활성화: 인증 관련 모바일 UI
            {!loading && (
              <div className="pt-2 border-t border-[#3a404d]">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-white/80">
                      <User size={16} />
                      <span className="text-sm">
                        {user.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-3 py-2 bg-[#3a404d] hover:bg-[#4a505c] rounded-md transition-colors w-full"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 bg-[#6ee7b7] text-black font-medium rounded-md hover:bg-[#5ad1a0] transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
            */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
