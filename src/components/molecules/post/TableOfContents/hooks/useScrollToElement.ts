"use client";

import { useCallback } from "react";

interface UseScrollToElementProps {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useScrollToElement({ 
  offset = 100, 
  behavior = "smooth" 
}: UseScrollToElementProps = {}) {
  
  const scrollToElement = useCallback((id: string) => {
    console.log(`Attempting to scroll to: ${id}`);
    const element = document.getElementById(id);

    if (element) {
      console.log(`Element found:`, element);
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
      console.log(`Scrolling to position: ${y}`);
      window.scrollTo({ top: y, behavior });
    } else {
      console.error(`Element not found for ID: ${id}`);
      // 모든 헤더 요소 확인
      const allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      console.log(
        "All headers:",
        Array.from(allHeaders).map(h => ({
          id: h.id,
          text: h.textContent?.trim(),
          tagName: h.tagName,
        }))
      );
    }
  }, [offset, behavior]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return {
    scrollToElement,
    scrollToTop
  };
}