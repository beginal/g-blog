"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';

interface PostActionsProps {
  postId: string;
}

export default function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/');
      } else {
        alert('게시물 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex space-x-4">
      <Link href={`/admin/posts/${postId}/edit`} className="text-blue-400 hover:text-blue-300">
        <Edit size={20} />
      </Link>
      <button onClick={handleDelete} className="text-red-400 hover:text-red-300">
        <Trash2 size={20} />
      </button>
    </div>
  );
}
