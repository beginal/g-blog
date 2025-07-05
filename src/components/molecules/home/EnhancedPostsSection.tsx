"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { fetchPosts } from "@/data/posts";
import type { BlogPostProps } from "@/types";
import { BookOpen, Calendar, Tag } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { cn } from "@/lib/utils";
import Link from "next/link";

const POSTS_PER_PAGE = 12;

interface EnhancedPostsSectionProps {
  className?: string;
}

export default function EnhancedPostsSection({ className }: EnhancedPostsSectionProps) {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const getPosts = async () => {
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
    };

    getPosts();
  }, []);

  const handleRetry = useCallback(async () => {
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

  const { totalPages, paginatedPosts } = useMemo(() => {
    const total = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginated = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
    return { totalPages: total, paginatedPosts: paginated };
  }, [posts, currentPage]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(p => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  return (
    <div className={cn("bg-[#3a404d] rounded-2xl shadow-lg text-white border border-[#3a404d] overflow-hidden flex flex-col h-full min-h-[350px]", className)}>
      {/* 헤더 */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-white/80" />
              최근 포스트
            </h3>
            <p className="text-sm text-white/60 mt-1">개발 이야기와 학습 기록</p>
          </div>
          <Link 
            href="/posts/new" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-white font-medium text-sm rounded-lg hover:from-[#5eead4] hover:to-[#2563eb] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">새 게시물 작성</span>
            <span className="sm:hidden">글쓰기</span>
          </Link>
        </div>
      </div>

      {/* 스크롤 가능한 포스트 목록 */}
      <div className="flex-grow overflow-y-auto md:max-h-[calc(100%-160px)]">
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" color="primary" />
            </div>
          ) : error ? (
            <ErrorMessage title="포스트 로딩 실패" message={error} onRetry={handleRetry} className="bg-red-500/10 border-red-500/30" />
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block p-3 transition-all duration-200"
                style={
                  index !== paginatedPosts.length - 1
                    ? { borderBottom: '1px solid rgba(255,255,255,0.2)' }
                    : {}
                }
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-1 text-xs rounded-full border font-medium bg-green-500/20 text-green-300 border-green-500/30">
                      포스트
                    </span>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.tags[0]}
                        {post.tags.length > 1 && <span>+{post.tags.length - 1}</span>}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1 line-clamp-2 hover:text-white/90 transition-colors">{post.title}</h4>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>아직 작성된 포스트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-white/10 bg-white/5 flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-xs text-white/60 hover:text-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1 hover:bg-white/10 rounded"
            >
              이전
            </button>
            <span className="text-xs text-white/60">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-xs text-white/60 hover:text-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1 hover:bg-white/10 rounded"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
