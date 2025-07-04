"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface EditorHeaderProps {
  mode: "create" | "edit";
  onBack: () => void;
}

export default function EditorHeader({ mode, onBack }: EditorHeaderProps) {
  const title = mode === "edit" ? "게시물 수정" : "새 게시물 작성";
  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>뒤로가기</span>
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      <div className="w-20"></div> {/* Spacer for centering */}
    </div>
  );
}