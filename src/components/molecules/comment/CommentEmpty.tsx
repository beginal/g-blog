"use client";

import { MessageCircle } from "lucide-react";

export default function CommentEmpty() {
  return (
    <div className="text-center py-12">
      <MessageCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
      <p className="text-gray-400 text-lg mb-2">아직 댓글이 없습니다</p>
      <p className="text-gray-500 text-sm">첫 번째 댓글을 작성해보세요!</p>
    </div>
  );
}