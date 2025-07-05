"use client";

import Link from 'next/link';
import { Edit } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils';
import type { PostActionsProps } from '@/types';
import DeleteButton from './DeleteButton';

const VARIANT_CLASSES = {
  default: '',
  compact: 'space-y-1',
  minimal: 'opacity-70 hover:opacity-100'
} as const;

const EDIT_BUTTON_CLASSES = "flex items-center gap-2 px-3 py-2 text-blue-500 hover:text-blue-600 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors duration-200 cursor-pointer";

const PostActions = memo(function PostActions({ 
  postId, 
  className, 
  variant = 'default' 
}: PostActionsProps) {
  return (
    <div className={cn('relative', VARIANT_CLASSES[variant], className)}>
      <div className="flex space-x-3">
        <Link 
          href={`/posts/${postId}/edit`} 
          className={EDIT_BUTTON_CLASSES}
        >
          <Edit size={16} />
          <span className="text-sm font-medium">수정</span>
        </Link>
        <DeleteButton postId={postId} variant="button" />
      </div>
    </div>
  );
});

export default PostActions;
