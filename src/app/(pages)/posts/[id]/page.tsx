import { fetchPostById } from "@/data/posts";
import { notFound } from "next/navigation";
import { PostHeader, PostNavigation, PostContent, BackToListButton, ErrorDisplay } from "@/components/molecules/post";
import { TableOfContents } from "@/components/molecules/post/TableOfContents";
// import { CommentSection } from "@/components/molecules/comment"; // 임시 비활성화
import { generatePostMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const post = await fetchPostById(resolvedParams.id);
    
    if (!post) {
      return {
        title: "포스트를 찾을 수 없습니다",
        description: "요청하신 블로그 포스트를 찾을 수 없습니다.",
      };
    }

    const metadata = {
      title: post.title,
      description: post.content.slice(0, 160).replace(/[#*`]/g, '') + "...",
      slug: resolvedParams.id,
      publishedAt: post.created_at,
      tags: post.tags || [],
    } as any;
    
    if (post.thumbnail) {
      metadata.image = post.thumbnail;
    }
    
    return generatePostMetadata(metadata);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "블로그 포스트",
      description: "개발 블로그 포스트를 확인하세요.",
    };
  }
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
      <JsonLd 
        type="article" 
        data={{
          title: post.title,
          description: post.content.slice(0, 160).replace(/[#*`]/g, '') + "...",
          image: post.thumbnail,
          publishedAt: post.created_at,
          modifiedAt: post.updated_at,
          tags: post.tags,
          slug: resolvedParams.id,
        }}
      />
      
      <PostHeader title={post.title} date={post.created_at} tags={post.tags} />

      <PostNavigation postId={post.id} />

      <div className="flex gap-8 mt-8">
        <div className="flex-1 max-w-4xl">
          <PostContent initialValue={post.content} />
          
          {/* 댓글 섹션 - 임시 비활성화 */}
          {/* <CommentSection postId={post.id} /> */}
        </div>

        <aside className="lg:block w-64">
          <TableOfContents content={post.content} title={post.title} />
        </aside>
      </div>

      <BackToListButton />
    </div>
  );
}
