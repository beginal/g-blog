"use client";

import { memo } from "react";
import { COLORS } from "@/config/constants";

interface TableOfContentsTitleProps {
  title: string;
  onClick: () => void;
}

export const TableOfContentsTitle = memo(function TableOfContentsTitle({ 
  title, 
  onClick 
}: TableOfContentsTitleProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium mb-4 text-gray-400 transition-colors duration-200 cursor-pointer block"
      style={{
        '--hover-color': COLORS.primary,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = COLORS.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '';
      }}
    >
      {title}
    </button>
  );
});