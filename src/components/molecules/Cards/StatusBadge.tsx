"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "완료":
        return "text-green-500 bg-green-500/15 border-green-500/30 group-hover:bg-green-500/25 group-hover:border-green-500/50";
      case "개발 중":
        return "text-orange-500 bg-orange-500/15 border-orange-500/30 group-hover:bg-orange-500/25 group-hover:border-orange-500/50";
      case "기획 중":
        return "text-purple-500 bg-purple-500/15 border-purple-500/30 group-hover:bg-purple-500/25 group-hover:border-purple-500/50";
      default:
        return "text-gray-400 bg-gray-400/15 border-gray-400/30 group-hover:bg-gray-400/25 group-hover:border-gray-400/50";
    }
  };

  return (
    <div className={`absolute top-4 right-4 ${className}`}>
      <span className={`text-xs font-semibold px-2 py-1 rounded-md border inline-block transition-all duration-300 backdrop-blur-sm ${getStatusClasses(status)}`}>
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;