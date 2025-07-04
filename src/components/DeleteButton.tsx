"use client";

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { deletePost } from '@/lib/api';
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
      const response = await deletePost(postId);
      
      if (response.success) {
        onDelete?.(postId);
        router.push('/');
      } else {
        alert('게시물 삭제에 실패했습니다: ' + (response.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  }, [postId, onDelete, router, showConfirm, disabled, isDeleting]);

  const baseClasses = 'transition-colors focus:outline-none focus:ring-2 focus:ring-red-500';
  const variantClasses = {
    default: 'text-red-400 hover:text-red-300 disabled:text-red-600 disabled:opacity-50',
    compact: 'text-red-400 hover:text-red-300 p-1 rounded',
    button: 'px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:bg-red-800'
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={disabled || isDeleting}
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-label={isDeleting ? '삭제 중...' : '게시물 삭제'}
    >
      <Trash2 size={variant === 'compact' ? 16 : 20} />
      {variant === 'button' && (
        <span className="ml-1">
          {isDeleting ? '삭제 중...' : '삭제'}
        </span>
      )}
    </button>
  );
});

export default DeleteButton;