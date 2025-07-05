import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToListButton() {
  return (
    <div className="flex justify-center mt-8">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-[#3a404d] hover:bg-[#4a505c] text-white rounded-lg transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>목록으로 돌아가기</span>
      </Link>
    </div>
  );
}