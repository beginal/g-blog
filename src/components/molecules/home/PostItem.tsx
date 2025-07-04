import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostProps } from "@/types";

interface PostItemProps {
  post: BlogPostProps;
}

const PostItem = memo(({ post }: PostItemProps) => (
  <Link
    href={`/posts/${post.id}`}
    className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-[#3a404d] last:border-b-0 cursor-pointer group hover:bg-[#3a404d]/30 transition-colors rounded-lg px-2 gap-4"
  >
    {post.thumbnail && (
      <div className="w-full sm:w-20 lg:w-24 h-32 sm:h-20 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={96}
          height={96}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM2E0MDRkIi8+Cjwvc3ZnPgo="
        />
      </div>
    )}
    <div className="flex-grow min-w-0">
      <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors mb-1 line-clamp-2">
        {post.title}
      </h3>
      {post.thumbnail && (
        <p className="text-sm text-white/70 mb-2 line-clamp-2 hidden sm:block">
          {post.content.substring(0, 100)}...
        </p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">
          {new Date(post.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </span>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[#4a505c] text-xs rounded-full text-white/70">
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-white/50">+{post.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </div>
  </Link>
));

PostItem.displayName = "PostItem";

export default PostItem;