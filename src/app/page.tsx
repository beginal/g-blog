"use client";

import ProfileSection from "@/components/organisms/ProfileSection";
import EnhancedPostsSection from "@/components/molecules/home/EnhancedPostsSection";
import "@/styles/profile-section.css";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <ProfileSection />
      <EnhancedPostsSection className="mb-8 lg:mb-0" />
    </div>
  );
}
