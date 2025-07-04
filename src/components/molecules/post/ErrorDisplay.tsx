import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ErrorDisplayProps {
  title: string;
  message: string;
  showBackButton?: boolean;
}

export default function ErrorDisplay({ title, message, showBackButton = true }: ErrorDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">{title}</h1>
        <p className="text-red-300 mb-4">{message}</p>
        {showBackButton && (
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#6ee7b7] text-black font-medium rounded-md hover:bg-[#5ad1a0] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>홈으로 돌아가기</span>
          </Link>
        )}
      </div>
    </div>
  );
}