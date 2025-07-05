import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostProps } from "@/types";
import { COLORS } from "@/config/constants";

interface PostItemProps {
  post: BlogPostProps;
}

const PostItem = memo(({ post }: PostItemProps) => (
  <Link
    href={`/posts/${post.id}`}
    className="flex flex-col sm:flex-row items-start sm:items-center py-3 sm:py-4 border-b last:border-b-0 cursor-pointer group transition-colors rounded-lg px-2 gap-3 sm:gap-4 min-h-[80px] sm:min-h-[88px]"
    style={{
      borderBottomColor: COLORS.surfaceLight,
      '--hover-bg': `${COLORS.surfaceLight}30`,
    } as React.CSSProperties}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = `${COLORS.surfaceLight}30`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
  >
    {post.thumbnail && (
      <div className="w-full sm:w-16 lg:w-20 h-24 sm:h-16 lg:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={80}
          height={80}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM2E0MDRkIi8+Cjwvc3ZnPgo="
        />
      </div>
    )}
    <div className="flex-grow min-w-0">
      <h3 className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors mb-2 line-clamp-1 sm:line-clamp-2">
        {post.title}
      </h3>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-white/50">
          {new Date(post.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </span>
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-1">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full text-white/60 whitespace-nowrap"
                style={{ backgroundColor: COLORS.surfaceLighter }}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[10px] sm:text-xs text-white/40">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  </Link>
));

PostItem.displayName = "PostItem";

export default PostItem;