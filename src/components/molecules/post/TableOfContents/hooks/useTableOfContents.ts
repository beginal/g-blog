"use client";

import { useEffect, useState, useCallback } from "react";
import { TocItem } from "../TableOfContents.types";

interface UseTableOfContentsProps {
  content: string;
  containerSelector?: string;
}

export function useTableOfContents({ content, containerSelector = ".toast-ui-viewer" }: UseTableOfContentsProps) {
  const [headers, setHeaders] = useState<TocItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateHeaders = useCallback(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headerElements = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const updatedHeaders: TocItem[] = [];

    headerElements.forEach((el, index) => {
      const text = el.textContent?.trim() || "";
      const level = parseInt(el.tagName[1] || "1");
      const id = el.id || `heading-${index}`;

      // 빈 텍스트가 아닌 경우에만 추가
      if (text) {
        updatedHeaders.push({ id, text, level });
      }
    });

    if (updatedHeaders.length > 0) {
      setHeaders(updatedHeaders);
      setIsLoading(false);
    }
  }, [containerSelector]);

  useEffect(() => {
    // 초기 로딩 상태 설정
    setIsLoading(true);

    // 여러 번 시도하여 헤더 정보 수집
    const timeouts = [200, 600, 1200, 2500, 4000];
    const cleanup: NodeJS.Timeout[] = [];

    timeouts.forEach(delay => {
      const timeout = setTimeout(() => {
        updateHeaders();
        // 마지막 시도 후에도 헤더가 없으면 로딩 상태 해제
        if (delay === 4000) {
          setIsLoading(false);
        }
      }, delay);
      cleanup.push(timeout);
    });

    return () => {
      cleanup.forEach(timeout => clearTimeout(timeout));
    };
  }, [content, updateHeaders]);

  return {
    headers,
    isLoading,
    updateHeaders,
  };
}
