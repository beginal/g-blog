"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import { fetchPosts } from "@/data/posts";
import type { BlogPostProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

const POSTS_PER_PAGE = 8;

// 포스트 아이템 컴포넌트를 메모화
const PostItem = React.memo(({ post }: { post: BlogPostProps }) => (
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
      <p className="text-sm text-white/70 mb-2 line-clamp-2 hidden sm:block">{post.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">{post.date}</span>
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

export default function Home() {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError("포스트를 불러오는 데 실패했습니다.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // 페이지네이션 계산을 메모화
  const { totalPages, paginatedPosts } = useMemo(() => {
    const total = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginated = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
    return { totalPages: total, paginatedPosts: paginated };
  }, [posts, currentPage]);

  // 페이지 변경 핸들러들을 메모화
  const handlePrevPage = useCallback(() => {
    setCurrentPage(p => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div className="lg:col-span-1 animate-slide-in-left">
        <ProfileCard />
      </div>
      <div className="lg:col-span-1 bg-[#3a404d] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3a404d] flex flex-col hover-lift animate-slide-in-right">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 flex-shrink-0 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Articles</h2>
          <Link 
            href="/posts/new" 
            className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1 bg-[#2c313a] rounded-md hover:bg-[#1e2228] self-start sm:self-auto"
          >
            새 게시물 작성
          </Link>
        </div>
        <div className="bg-[#2c313a] p-6 rounded-lg flex-grow flex flex-col justify-between min-h-[450px]">
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" color="primary" />
              </div>
            ) : error ? (
              <ErrorMessage
                title="포스트 로딩 실패"
                message={error}
                onRetry={getPosts}
                className="bg-red-500/10 border-red-500/30"
              />
            ) : paginatedPosts.length > 0 ? (
              paginatedPosts.map(post => (
                <PostItem key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center text-white/50 py-8">
                <p className="text-lg mb-2">아직 작성된 포스트가 없습니다.</p>
                <p className="text-sm">첫 번째 포스트를 작성해보세요!</p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-[#3a404d]">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-white/80 font-mono" aria-live="polite">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="다음 페이지"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
