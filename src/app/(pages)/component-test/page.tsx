"use client";

import React from "react";
import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";

const ComponentTestPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2c313a] hover:bg-[#3a404d] text-white text-sm font-medium rounded-lg transition-colors duration-200 border border-[#3a404d] hover:border-[#6ee7b7]/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="text-[#6ee7b7]" size={32} />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">컴포넌트 테스트</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
            새로 만들 컴포넌트를 독립된 공간에서 미리 만들고 테스트해보는 페이지입니다.
          </p>
        </div>

        <section className="mb-12">
          <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
            <h2 className="text-xl font-bold text-white mb-4">컴포넌트 테스트 영역</h2>
            <div className="rounded-lg p-8 border border-[#3a404d]/50"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentTestPage;
