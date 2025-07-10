"use client";

import { useEffect, useState } from "react";
import { TocItem } from "../TableOfContents.types";

interface UseActiveHeaderProps {
  headers: TocItem[];
  rootMargin?: string;
  threshold?: number[];
}

export function useActiveHeader({ 
  headers, 
  rootMargin = "-10% 0% -80% 0%",
  threshold = [0, 0.25, 0.5, 0.75, 1]
}: UseActiveHeaderProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headers.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        // 화면에 보이는 헤더들을 찾아서 가장 상단에 있는 것을 활성화
        const visibleHeaders = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
          }))
          .sort((a, b) => a.top - b.top);

        if (visibleHeaders.length > 0 && visibleHeaders[0]) {
          setActiveId(visibleHeaders[0].id);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Observer 등록 시 재시도 로직
    const observeHeaders = () => {
      headers.forEach(header => {
        const element = document.getElementById(header.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    observeHeaders();

    // 일정 시간 후 재시도
    const retryTimeout = setTimeout(observeHeaders, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(retryTimeout);
    };
  }, [headers, rootMargin, threshold]);

  return activeId;
}