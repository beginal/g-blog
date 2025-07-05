"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CompactProfileCard from "@/components/molecules/profile/CompactProfileCard";
import PatchNotesCard from "@/components/molecules/profile/PatchNotesCard";

interface ProfileSectionProps {
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ className }) => {
  return (
    <div className={cn(
      "profile-section flex flex-col gap-6 h-full",
      className
    )}>
      {/* A박스 - 컴팩트 Profile 영역 */}
      <div className="compact-profile-container flex-shrink-0 h-auto min-h-[320px]">
        <CompactProfileCard 
          className="h-full"
          maxContactItems={3}
          showBackground={true}
        />
      </div>

      {/* B박스 - 패치노트 영역 */}
      <div className="patch-notes-container flex-shrink-0 h-[calc(50%-12px)] min-h-[280px] max-h-[400px]">
        <PatchNotesCard 
          className="h-full"
          maxScrollHeight="calc(100% - 80px)"
          showViewAllButton={false}
          highlightRecent={true}
        />
      </div>
    </div>
  );
};

export default ProfileSection;