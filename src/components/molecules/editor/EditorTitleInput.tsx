"use client";

import React from "react";
import { Upload } from "lucide-react";
import { COLORS } from "@/config/constants";

interface EditorTitleInputProps {
  mode: "create" | "edit";
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function EditorTitleInput({ mode, value, onChange, disabled = false }: EditorTitleInputProps) {
  const placeholder = mode === "edit" ? "수정할 제목을 입력하세요" : "게시물 제목을 입력하세요";
  
  return (
    <div>
      <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
        <Upload size={16} />
        제목
      </label>
      <input
        type="text"
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg border text-white placeholder:text-white/50 focus:outline-none focus:ring-2 transition-colors" style={{ backgroundColor: COLORS.surfaceLight, borderColor: COLORS.surfaceLighter, '--tw-ring-color': COLORS.primary } as React.CSSProperties}
        placeholder={placeholder}
        required
        disabled={disabled}
      />
    </div>
  );
}