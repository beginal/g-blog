"use client";

import { cn } from "@/lib/utils";

interface TableOfContentsSkeletonProps {
  className?: string;
}

export function TableOfContentsSkeleton({ className }: TableOfContentsSkeletonProps) {
  return (
    <nav className={cn("sticky top-24", className)}>
      <div className="border-l-2 border-gray-700 pl-4">
        <div className="h-40 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </nav>
  );
}