import React from "react";
import { ArrowLeft } from "lucide-react";
import QuestWrapper from "@/components/QuestWrapper";
import { fetchPosts } from "@/data/posts";
import Link from "next/link";

// userStats는 임시로 여기에 정의합니다. 실제 앱에서는 사용자 인증 후 가져와야 합니다.
const userStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
};

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const posts = await fetchPosts();
  const post = posts.find(p => p.id === Number(params.id));

  if (!post) {
    return <div className="text-white text-center text-xl">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-[#2c313a] p-8 sm:p-12 rounded-2xl shadow-lg border border-[#3a404d] text-white animate-fade-in">
      <Link href="/" className="flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        목록으로 돌아가기
      </Link>
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
        <p className="text-center text-white/60 mb-12">{post.date}</p>
        <div className="space-y-8">
          {post.content.map((block, index) => {
            if (block.type === "dialogue") {
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <img src={block.avatar} alt={block.character} className="w-24 h-24 rounded-full border-4 border-[#4a505c] mb-2" />
                  <h3 className="font-bold text-lg mb-2">{block.character}</h3>
                  <p className="text-white/90 leading-relaxed">{block.text}</p>
                </div>
              );
            }
            return (
              <p key={index} className="text-white/90 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>
        {post.quest && <QuestWrapper quest={post.quest} />}
      </div>
    </div>
  );
}
