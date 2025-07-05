"use client";

import { MessageCircle } from "lucide-react";
import { useComments } from "@/hooks/useComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { comments, loading, error, submitting, addComment } = useComments(postId);

  return (
    <section className="mt-12">
      {/* 구분선 */}
      <div className="border-t border-[#3a404d] mb-8"></div>
      
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="h-6 w-6 text-[#6ee7b7]" />
        <h2 className="text-2xl font-bold text-white">
          댓글 {loading ? '' : `${comments.length}개`}
        </h2>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* 댓글 작성 폼 */}
      <div className="mb-8">
        <CommentForm onSubmit={addComment} submitting={submitting} />
      </div>

      {/* 댓글 목록 */}
      <CommentList comments={comments} loading={loading} />
    </section>
  );
}