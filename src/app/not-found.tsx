"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { COLORS } from "@/config/constants";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white animate-fade-in">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold mb-4 animate-bounce-in" style={{ color: COLORS.primary }}>404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-white/70 mb-8 max-w-md">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 font-medium rounded-lg transition-colors hover-lift"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
            }}
          >
            <Home size={16} />
            <span>홈으로 돌아가기</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg transition-colors"
            style={{
              backgroundColor: COLORS.surfaceLight,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.surfaceLighter;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.surfaceLight;
            }}
          >
            <ArrowLeft size={16} />
            <span>이전 페이지</span>
          </button>
        </div>
      </div>
    </div>
  );
}
