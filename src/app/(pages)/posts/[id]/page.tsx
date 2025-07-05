import { fetchPostById } from "@/data/posts";
import { notFound } from "next/navigation";
import { PostHeader, PostNavigation, PostContent, BackToListButton, ErrorDisplay } from "@/components/molecules/post";
import { TableOfContents } from "@/components/molecules/post/TableOfContents";
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
    return <ErrorDisplay title="포스트 로딩 실패" message="게시물을 불러오는 중 오류가 발생했습니다." />;
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      <PostHeader title={post.title} date={post.created_at} tags={post.tags} />

      <PostNavigation postId={post.id} />

      <div className="flex gap-8 mt-8">
        <div className="flex-1 max-w-4xl">
          <PostContent initialValue={post.content} />
        </div>

        <aside className=" lg:block w-64">
          <TableOfContents content={post.content} />
        </aside>
      </div>

      <BackToListButton />
    </div>
  );
}
