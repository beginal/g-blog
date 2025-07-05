"use client";

import { Comment } from "@/types/comment.types";
import CommentItem from "./CommentItem";
import CommentEmpty from "./CommentEmpty";

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
}

export default function CommentList({ comments, loading }: CommentListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d] animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="h-4 bg-gray-600 rounded w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <CommentEmpty />;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}