"use client";

import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        window.location.reload(); // 페이지 새로고침하여 변경 사항 반영
      } else {
        alert('게시물 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-300">
      <Trash2 size={20} />
    </button>
  );
}
