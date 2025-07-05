"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/config/constants";
import { TocItem } from "../TableOfContents.types";

interface TableOfContentsItemProps {
  header: TocItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const TableOfContentsItem = memo(function TableOfContentsItem({ 
  header, 
  isActive, 
  onClick 
}: TableOfContentsItemProps) {
  const getItemStyles = () => ({
    paddingLeft: `${Math.max(0, (header.level - 1) * 8)}px`,
    ...(isActive && {
      color: COLORS.primary,
      borderLeftColor: COLORS.primary,
      backgroundColor: `${COLORS.primary}1A`, // 10% opacity
    }),
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive) {
      e.currentTarget.style.borderLeftColor = COLORS.primary;
      e.currentTarget.style.color = COLORS.text;
      e.currentTarget.style.backgroundColor = `${COLORS.primary}0D`; // 5% opacity
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive) {
      e.currentTarget.style.borderLeftColor = 'transparent';
      e.currentTarget.style.color = '';
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  return (
    <li>
      <button
        onClick={() => onClick(header.id)}
        className={cn(
          "text-left w-full text-sm py-1 transition-all duration-200 border-l-2 pl-3 -ml-3 cursor-pointer",
          !isActive && "text-gray-400 border-transparent",
          // 헤더 레벨에 따른 들여쓰기 및 크기 조정
          header.level === 1 && "pl-2 font-medium",
          header.level === 2 && "pl-3 text-xs",
          header.level === 3 && "pl-4 text-xs",
          header.level >= 4 && "pl-6 text-xs opacity-75"
        )}
        style={getItemStyles()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {header.text}
      </button>
    </li>
  );
});