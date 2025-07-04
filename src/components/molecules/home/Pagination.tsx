import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-[#3a404d]">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-white/80 font-mono" aria-live="polite">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="다음 페이지"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}