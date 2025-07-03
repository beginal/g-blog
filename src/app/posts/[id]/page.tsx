import React from "react";
import { ArrowLeft } from "lucide-react";
import QuestWrapper from "@/components/QuestWrapper";
import { fetchPosts } from "@/data/posts";
import Link from "next/link";
import Image from "next/image";
import PostActions from "@/components/PostActions";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map(post => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({ params }: any) {
  const posts = await fetchPosts();
  const post = posts.find(p => p.id.toString() === params.id);

  if (!post) {
    return <div className="text-white text-center text-xl">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-[#2c313a] p-8 sm:p-12 rounded-2xl shadow-lg border border-[#3a404d] text-white animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          목록으로 돌아가기
        </Link>
        <PostActions postId={post.id} />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
        <p className="text-center text-white/60 mb-12">{post.date}</p>
        <div className="space-y-8">
          {post.content.map((block, index) => {
            if (block.type === "dialogue") {
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <Image
                    src={block.avatar}
                    alt={block.character}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-4 border-[#4a505c] mb-2"
                  />
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
