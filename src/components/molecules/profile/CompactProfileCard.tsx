import React, { memo } from "react";
import { cn } from "@/lib/utils";
import ProfileBackground from "./ProfileBackground";
import ProfileHeader from "./ProfileHeader";
import ProfileContactInfo from "./ProfileContactInfo";
import Link from "next/link";
import { User } from "lucide-react";

interface CompactProfileCardProps {
  className?: string;
  variant?: 'default' | 'minimal';
  maxContactItems?: number;
  showBackground?: boolean;
}

const CompactProfileCard: React.FC<CompactProfileCardProps> = memo(({
  className,
  variant = 'default',
  maxContactItems = 3,
  showBackground = true
}) => {
  const baseClasses =
    "bg-[#3a404d] rounded-2xl shadow-lg text-white border border-[#3a404d] overflow-hidden flex flex-col h-full";
  
  const variantClasses = {
    default: "",
    minimal: "bg-transparent border-none shadow-none",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* 이미지와 콘텐츠 영역을 1:1 비율로 조정 */}
      <ProfileBackground 
        show={showBackground}
        className="h-1/2 flex-shrink-0"  // 전체 높이의 50%
      />

      {/* 콘텐츠 영역도 50% */}
      <div className="h-1/2 p-4 flex flex-col">
        <div className="flex-grow">
          <ProfileHeader />
          <ProfileContactInfo 
            show={true}
            maxItems={maxContactItems}
            layout="compact"
          />
        </div>
        
        {/* 중앙 버튼 */}
        <div className="flex justify-center mt-4">
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6ee7b7] hover:bg-[#5dd4a3] text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <User className="w-5 h-5" />
            <span>이력서 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
});

CompactProfileCard.displayName = "CompactProfileCard";

export default CompactProfileCard;