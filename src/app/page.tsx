"use client";

import { ProfileCard } from "@/components/molecules/profile";
import { PostsSection } from "@/components/molecules/home";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <ProfileCard />
      <PostsSection />
    </div>
  );
}
