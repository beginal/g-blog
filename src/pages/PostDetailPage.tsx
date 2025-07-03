import React from "react";
import { ArrowLeft } from "lucide-react";
import type { BlogPostProps } from "../types";
import QuestComponent from "../components/QuestComponent";

const PostDetailPage: React.FC<{ post: BlogPostProps; onBack: () => void; onQuestComplete: (xp: number) => void }> = ({
  post,
  onBack,
  onQuestComplete,
}) => (
  <div className="bg-[#2c313a] p-8 sm:p-12 rounded-2xl shadow-lg border border-[#3a404d] text-white animate-fade-in">
    <button onClick={onBack} className="flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors">
      <ArrowLeft size={20} />
      목록으로 돌아가기
    </button>
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
      {post.quest && <QuestComponent quest={post.quest} onComplete={onQuestComplete} />}
    </div>
  </div>
);

export default PostDetailPage;
