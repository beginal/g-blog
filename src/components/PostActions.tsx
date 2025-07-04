"use client";

import Link from 'next/link';
import { Edit, MoreVertical } from 'lucide-react';
import DeleteButton from './DeleteButton';
import { useState, memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { PostActionsProps } from '@/types';

const PostActions = memo(function PostActions({ postId, className, variant = 'default' }: PostActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const baseClasses = 'relative';
  const variantClasses = {
    default: '',
    compact: 'space-y-1',
    minimal: 'opacity-70 hover:opacity-100'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Desktop Actions */}
      <div className="hidden sm:flex space-x-2">
        <Link 
          href={`/posts/${postId}/edit`} 
          className="flex items-center space-x-1 px-3 py-2 bg-[#4a505c] hover:bg-[#5a616e] text-white rounded-md transition-colors group"
        >
          <Edit size={16} className="group-hover:text-[#6ee7b7] transition-colors" />
          <span className="text-sm">수정</span>
        </Link>
        <DeleteButton postId={postId} />
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-[#4a505c] transition-colors"
          aria-label="메뉴 열기"
        >
          <MoreVertical size={20} />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 bg-[#2c313a] border border-[#4a505c] rounded-lg shadow-lg z-10 min-w-[120px]">
            <Link 
              href={`/posts/${postId}/edit`}
              className="flex items-center space-x-2 px-4 py-3 hover:bg-[#3a404d] transition-colors"
              onClick={closeMenu}
            >
              <Edit size={16} />
              <span className="text-sm">수정</span>
            </Link>
            <div className="px-4 py-2">
              <DeleteButton postId={postId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PostActions;
