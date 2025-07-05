"use client";

import React from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { COLORS } from "@/config/constants";

interface EditorActionsProps {
  mode: "create" | "edit";
  loading: boolean;
  onCancel: () => void;
}

export default function EditorActions({ mode, loading, onCancel }: EditorActionsProps) {
  const submitText = mode === "edit" ? "수정 완료" : "게시물 작성";
  const loadingText = mode === "edit" ? "수정 중..." : "작성 중...";

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
        style={{
          backgroundColor: COLORS.surfaceLight,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = COLORS.surfaceLighter;
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = COLORS.surfaceLight;
          }
        }}
        disabled={loading}
      >
        취소
      </button>
      <button
        type="submit"
        className="flex-1 text-black font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          backgroundColor: COLORS.primary,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = COLORS.primaryHover;
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = COLORS.primary;
          }
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" color="white" />
            {loadingText}
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
}