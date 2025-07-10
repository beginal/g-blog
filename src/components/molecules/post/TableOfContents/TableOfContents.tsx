"use client";

import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { TableOfContentsProps } from "./TableOfContents.types";
import { useTableOfContents } from "./hooks/useTableOfContents";
import { useActiveHeader } from "./hooks/useActiveHeader";
import { useScrollToElement } from "./hooks/useScrollToElement";
import { TableOfContentsSkeleton } from "./components/TableOfContentsSkeleton";
import { TableOfContentsTitle } from "./components/TableOfContentsTitle";
import { TableOfContentsItem } from "./components/TableOfContentsItem";

const TableOfContents = memo(function TableOfContents({ 
  content, 
  title, 
  className,
  containerSelector = ".toast-ui-viewer"
}: TableOfContentsProps) {
  const { headers, isLoading } = useTableOfContents({ 
    content, 
    containerSelector 
  });
  
  const activeId = useActiveHeader({ headers });
  
  const { scrollToElement, scrollToTop } = useScrollToElement();

  // 메모이제이션된 헤더 목록
  const headerItems = useMemo(() => 
    headers.map(header => (
      <TableOfContentsItem
        key={header.id}
        header={header}
        isActive={activeId === header.id}
        onClick={scrollToElement}
      />
    )), 
    [headers, activeId, scrollToElement]
  );

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <TableOfContentsSkeleton className={className || ""} />;
  }

  // 헤더가 없는 경우 null 반환
  if (headers.length === 0) return null;

  return (
    <nav className={cn("sticky top-24", className)}>
      <div className="border-l-2 border-gray-700 pl-4 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
        {title && (
          <TableOfContentsTitle 
            title={title} 
            onClick={scrollToTop} 
          />
        )}
        <ul className="space-y-2">
          {headerItems}
        </ul>
      </div>
    </nav>
  );
});

export default TableOfContents;
