"use client";

import React from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface EditorErrorMessageProps {
  mode: "create" | "edit";
  message: string;
}

export default function EditorErrorMessage({ mode, message }: EditorErrorMessageProps) {
  const title = `게시물 ${mode === "edit" ? "수정" : "작성"} 실패`;
  
  return (
    <ErrorMessage
      title={title}
      message={message}
      className="bg-red-500/10 border-red-500/30"
    />
  );
}