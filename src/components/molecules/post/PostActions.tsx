"use client";

import Link from 'next/link';
import { Edit } from 'lucide-react';
import DeleteButton from './DeleteButton';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { PostActionsProps } from '@/types';

const PostActions = memo(function PostActions({ postId, className, variant = 'default' }: PostActionsProps) {
  console.log('PostActions 렌더링, postId:', postId, 'variant:', variant);

  const baseClasses = 'relative';
  const variantClasses = {
    default: '',
    compact: 'space-y-1',
    minimal: 'opacity-70 hover:opacity-100'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Desktop Actions - 항상 표시 */}
      <div className="flex space-x-2">
        <Link 
          href={`/posts/${postId}/edit`} 
          className="flex items-center space-x-1 px-3 py-2 bg-[#4a505c] hover:bg-[#5a616e] text-white rounded-md transition-colors group"
        >
          <Edit size={16} className="group-hover:text-[#6ee7b7] transition-colors" />
          <span className="text-sm">수정</span>
        </Link>
        <DeleteButton postId={postId} />
      </div>
    </div>
  );
});

export default PostActions;
