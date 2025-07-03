import { useState, useEffect } from "react";
import { Award } from "lucide-react";

import type { BlogPostProps } from "./types";
import { fetchPosts } from "./data/posts";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MainPage from "./pages/MainPage";
import PostDetailPage from "./pages/PostDetailPage";

export default function App() {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [userStats, setUserStats] = useState({ level: 1, xp: 0, xpToNextLevel: 100 });
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts().then(data => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const handleQuestComplete = (xpGained: number) => {
    setUserStats(prevStats => {
      const newXp = prevStats.xp + xpGained;
      if (newXp >= prevStats.xpToNextLevel) {
        setLevelUp(true);
        setTimeout(() => setLevelUp(false), 2000); // 2초 후 애니메이션 제거
        return {
          level: prevStats.level + 1,
          xp: newXp - prevStats.xpToNextLevel,
          xpToNextLevel: Math.floor(prevStats.xpToNextLevel * 1.5), // 다음 레벨 필요 경험치 1.5배 증가
        };
      }
      return { ...prevStats, xp: newXp };
    });
  };

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;

  const handleHomeClick = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="bg-[#262b33] min-h-screen font-sans text-white">
      {levelUp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <Award size={80} className="text-yellow-400 animate-bounce" />
            <h2 className="text-5xl font-bold text-white mt-4">LEVEL UP!</h2>
            <p className="text-2xl text-yellow-400">You are now Level {userStats.level}!</p>
          </div>
        </div>
      )}
      <Header onHomeClick={handleHomeClick} />
      <main className="pt-[90px] pb-[90px] px-2 sm:px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-20 text-white/80">Loading posts...</div>
          ) : selectedPost ? (
            <div className="max-w-[600px] mx-auto">
              <PostDetailPage post={selectedPost} onBack={handleHomeClick} onQuestComplete={handleQuestComplete} />
            </div>
          ) : (
            <MainPage posts={posts} onPostClick={setSelectedPostId} userStats={userStats} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
