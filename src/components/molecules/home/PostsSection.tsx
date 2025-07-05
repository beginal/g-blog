"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { fetchPosts } from "@/data/posts";
import type { BlogPostProps } from "@/types";
import { COLORS } from "@/config/constants";
import PostsHeader from "./PostsHeader";
import PostsList from "./PostsList";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 8;

export default function PostsSection() {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Strict Mode에서 중복 실행 방지
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("API 요청 시작 - 홈페이지 포스트 목록");
        const fetchedPosts = await fetchPosts();
        console.log("API 응답 완료 - 포스트 개수:", fetchedPosts.length);
        setPosts(fetchedPosts);
      } catch (err) {
        setError("포스트를 불러오는 데 실패했습니다.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

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
    <div 
      className="lg:col-span-1 p-6 sm:p-8 rounded-2xl shadow-lg border flex flex-col hover-lift animate-slide-in-right"
      style={{
        backgroundColor: COLORS.surfaceLight,
        borderColor: COLORS.surfaceLight,
      }}
    >
      <PostsHeader />
      
      <div 
        className="p-4 sm:p-6 rounded-lg flex-grow flex flex-col justify-between min-h-[450px] max-h-[600px] overflow-hidden"
        style={{ backgroundColor: COLORS.surface }}
      >
        <PostsList 
          posts={paginatedPosts}
          loading={loading}
          error={error}
          onRetry={handleRetry}
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}