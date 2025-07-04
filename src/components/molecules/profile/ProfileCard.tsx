import React, { memo } from "react";
import { cn } from "@/lib/utils";
import type { ProfileCardProps } from "@/types";
import ProfileBackground from "./ProfileBackground";
import ProfileHeader from "./ProfileHeader";
import ProfileContactInfo from "./ProfileContactInfo";

const ProfileCard: React.FC<ProfileCardProps> = memo(
  ({ className, variant = "default", showBackground = true, showContactInfo = true }) => {
    const baseClasses =
      "bg-[#3a404d] rounded-2xl shadow-lg text-white border border-[#3a404d] overflow-hidden flex flex-col animate-fade-in";
    const variantClasses = {
      default: "h-full",
      compact: "h-auto",
      minimal: "bg-transparent border-none shadow-none",
    };

    return (
      <div className="lg:col-span-1 animate-slide-in-left">
        <div className={cn(baseClasses, variantClasses[variant], className)}>
          <ProfileBackground show={showBackground} />

          <div className="p-6 sm:p-8 flex-grow">
            <ProfileHeader />
            <ProfileContactInfo show={showContactInfo} />
          </div>
        </div>
      </div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
