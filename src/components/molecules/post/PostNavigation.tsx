"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostActions from "./PostActions";

interface PostNavigationProps {
  postId: string;
}

export default function PostNavigation({ postId }: PostNavigationProps) {
  console.log('PostNavigation 렌더링, postId:', postId);
  
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#3a404d]">
      <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">뒤로가기</span>
      </Link>
      <PostActions postId={postId} />
    </div>
  );
}