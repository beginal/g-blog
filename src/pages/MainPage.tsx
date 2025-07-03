import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPostProps } from "../types";
import ProfileCard from "../components/ProfileCard";

const POSTS_PER_PAGE = 8;

const MainPage: React.FC<{ posts: BlogPostProps[]; onPostClick: (id: number) => void; userStats: any }> = ({
  posts,
  onPostClick,
  userStats,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.some(block => block.text.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    );
  }, [searchQuery, posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
      <div className="lg:col-span-1">
        <ProfileCard userStats={userStats} />
      </div>
      <div className="lg:col-span-1 bg-[#3a404d] p-8 rounded-2xl shadow-lg border border-[#3a404d] flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">Articles</h2>
        <div className="bg-[#2c313a] p-6 rounded-lg flex-grow flex flex-col justify-between min-h-[450px]">
          <div>
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => onPostClick(post.id)}
                  className="flex justify-between items-center py-4 border-b border-[#3a404d] last:border-b-0 cursor-pointer group"
                >
                  <h3 className="text-base text-white/90 group-hover:text-white transition-colors">{post.title}</h3>
                  <span className="text-sm text-white/60 flex-shrink-0 ml-4">{post.date}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-white/50 py-8">No posts found.</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-[#3a404d]">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-white/80 font-mono">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 flex-shrink-0 bg-[#2c313a] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Search</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-grow bg-[#3a404d] border border-[#4a505c] rounded-lg py-2 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]/50"
            />
            <button className="bg-[#6ee7b7] text-black p-2 rounded-lg hover:bg-opacity-80 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
