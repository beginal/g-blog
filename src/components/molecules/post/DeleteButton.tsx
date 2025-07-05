"use client";

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import { deletePost } from '@/lib/api/post';
import { cn } from '@/lib/utils';
import type { DeleteButtonProps } from '@/types';

const DeleteButton = memo(function DeleteButton({ 
  postId, 
  className, 
  variant = 'default',
  onDelete,
  showConfirm = true,
  disabled = false
}: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (disabled || isDeleting) return;

    if (showConfirm && !confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    
    try {
      await deletePost(postId);
      onDelete?.(postId);
      router.push('/');
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  }, [postId, onDelete, router, showConfirm, disabled, isDeleting]);

  const VARIANT_CLASSES = {
    default: 'text-red-400 hover:text-red-300 disabled:text-red-600 disabled:opacity-50 cursor-pointer',
    compact: 'text-red-400 hover:text-red-300 p-1 rounded cursor-pointer',
    button: 'flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-500 border border-red-200 hover:border-red-300 rounded-lg transition-colors duration-200 disabled:text-red-300 disabled:border-red-100 disabled:cursor-not-allowed cursor-pointer'
  } as const;

  const baseClasses = 'transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50';

  return (
    <button 
      onClick={handleDelete} 
      disabled={disabled || isDeleting}
      className={cn(baseClasses, VARIANT_CLASSES[variant], className)}
      aria-label={isDeleting ? '삭제 중...' : '게시물 삭제'}
    >
      <Trash2 size={variant === 'compact' ? 16 : 20} />
      {variant === 'button' && (
        <span className="text-sm font-medium">
          {isDeleting ? '삭제 중...' : '삭제'}
        </span>
      )}
    </button>
  );
});

export default DeleteButton;