import { ArrowLeft } from "lucide-react";
import { fetchPostById } from "@/data/posts";
import Link from "next/link";
import PostActions from "@/components/PostActions";
import Viewer from "./Viewer";
import { notFound } from "next/navigation";
interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageParams) {
  const resolvedParams = await params;
  let post;

  try {
    post = await fetchPostById(resolvedParams.id);
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">포스트 로딩 실패</h1>
          <p className="text-red-300 mb-4">게시물을 불러오는 중 오류가 발생했습니다.</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#6ee7b7] text-black font-medium rounded-md hover:bg-[#5ad1a0] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
          <span>{post.date}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-[#3a404d] rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#3a404d]">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">뒤로가기</span>
        </Link>
        <PostActions postId={post.id} />
      </div>

      {/* Content */}
      <article className="bg-[#2c313a] rounded-2xl p-8 sm:p-8 border border-[#3a404d] shadow-lg">
        <div className="max-w-none">
          <Viewer initialValue={post.content} />
        </div>
      </article>

      {/* Back to top button */}
      <div className="flex justify-center mt-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#3a404d] hover:bg-[#4a505c] text-white rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span>목록으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
