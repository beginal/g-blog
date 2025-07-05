"use client";

import { Comment } from "@/types/comment.types";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <article className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6ee7b7] rounded-full flex items-center justify-center">
            <span className="text-black font-medium text-sm">
              {comment.nickname.charAt(0).toUpperCase()}
            </span>
          </div>
          <h4 className="font-medium text-white">{comment.nickname}</h4>
        </div>
        <time className="text-xs text-gray-400" dateTime={comment.created_at}>
          {formatDate(comment.created_at)}
        </time>
      </div>
      
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
        {comment.content}
      </div>
    </article>
  );
}