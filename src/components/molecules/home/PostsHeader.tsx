import Link from "next/link";

export default function PostsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 flex-shrink-0 gap-2">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Articles</h2>
      <Link 
        href="/posts/new" 
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-white font-medium text-sm rounded-lg hover:from-[#5eead4] hover:to-[#2563eb] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl self-start sm:self-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        새 게시물 작성
      </Link>
    </div>
  );
}