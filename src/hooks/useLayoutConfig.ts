'use client';

import { usePathname } from 'next/navigation';

// 헤더와 메인래퍼를 숨길 페이지들 정의
const HIDDEN_LAYOUT_PAGES = ['/about'];

export function useLayoutConfig() {
  const pathname = usePathname();
  
  const shouldShowHeader = !HIDDEN_LAYOUT_PAGES.includes(pathname);
  const shouldShowMainWrapper = !HIDDEN_LAYOUT_PAGES.includes(pathname);
  
  return {
    shouldShowHeader,
    shouldShowMainWrapper,
  };
}