import { useState, useMemo } from 'react';
import { PAGINATION } from '@/config';

interface UsePaginationProps {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToFirst: () => void;
  goToLast: () => void;
}

/**
 * 페이지네이션 로직을 관리하는 훅
 */
export function usePagination({
  totalItems,
  pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      totalPages,
      hasNext,
      hasPrev,
      startIndex,
      endIndex,
    };
  }, [totalItems, pageSize, currentPage]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, pagination.totalPages));
    setCurrentPage(validPage);
  };

  const goToNext = () => {
    if (pagination.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (pagination.hasPrev) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToFirst = () => {
    setCurrentPage(1);
  };

  const goToLast = () => {
    setCurrentPage(pagination.totalPages);
  };

  return {
    currentPage,
    pageSize,
    ...pagination,
    goToPage,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,
  };
}