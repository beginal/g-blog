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
    className="relative py-3 sm:py-4 border-b last:border-b-0 cursor-pointer group transition-all duration-300 rounded-lg px-3 min-h-[80px] sm:min-h-[100px] overflow-hidden"
    style={
      {
        borderBottomColor: COLORS.surfaceLight,
      } as React.CSSProperties
    }
    onMouseEnter={e => {
      e.currentTarget.style.backgroundColor = `${COLORS.surfaceLight}20`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.backgroundColor = "transparent";
    }}
  >
    {/* 백그라운드 썸네일 */}
    {post.thumbnail && (
      <div className="absolute inset-0 z-0">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM2E0MDRkIi8+Cjwvc3ZnPgo="
        />
        {/* 오버레이 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />
        {/* 추가 텍스트 배경 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    )}

    {/* 컨텐츠 */}
    <div className="relative z-10 flex flex-col justify-between">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-white/95 transition-colors mb-2 line-clamp-2 drop-shadow-lg">
          {post.title}
        </h3>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-xs text-white/80 font-medium drop-shadow-md">
          {new Date(post.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[10px] rounded-full text-white/90 font-medium backdrop-blur-sm border border-white/20 whitespace-nowrap"
                style={{
                  backgroundColor: `${COLORS.primary}40`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && <span className="text-[10px] text-white/70 font-medium drop-shadow-md">+{post.tags.length - 2}</span>}
          </div>
        )}
      </div>
    </div>
  </Link>
));

PostItem.displayName = "PostItem";

export default PostItem;
