"use client";

import React from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
        className="flex-1 bg-[#3a404d] hover:bg-[#4a505c] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
        disabled={loading}
      >
        취소
      </button>
      <button
        type="submit"
        className="flex-1 bg-[#6ee7b7] text-black font-bold py-3 rounded-lg hover:bg-[#5ad1a0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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