"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import "easymde/dist/easymde.min.css";
import type { BlogPostProps } from "@/types";
import TuiEditor from "./TuiEditor";
import { ArrowLeft, Save, Tag, Image as ImageIcon, Edit } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingCard from "@/components/ui/LoadingCard";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageParams) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error("게시물을 불러오는데 실패했습니다.");
        }
        const response = await res.json();
        const post: BlogPostProps = response.data;
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(", "));
        setThumbnail(post.thumbnail || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // 에디터에서 현재 내용 가져오기
      const editorContent = editorRef.current?.getInstance?.()?.getMarkdown() || content;

      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: editorContent,
          tags: tags.split(",").map(tag => tag.trim()),
          thumbnail,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "게시물 수정에 실패했습니다.");
      }

      router.push(`/posts/${id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
        <LoadingCard title="게시물 불러오는 중..." message="수정할 게시물을 불러오고 있습니다." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
        <ErrorMessage title="게시물 로딩 실패" message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/posts/${id}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>뒤로가기</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Edit size={24} />
          게시물 수정
        </h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="bg-[#2c313a] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3a404d]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Edit size={16} />
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
              placeholder="게시물 제목을 입력하세요"
              required
            />
          </div>

          {/* Content Editor */}
          <div>
            <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Edit size={16} />
              내용 (마크다운)
            </label>
            <div className="border border-[#4a505c] rounded-lg overflow-hidden">
              <TuiEditor
                ref={editorRef}
                initialValue={content}
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                hideModeSwitch={true}
              />
            </div>
          </div>

          {/* Tags and Thumbnail Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Tag size={16} />
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
                placeholder="예: React, JavaScript, Web"
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <ImageIcon size={16} />
                썸네일 이미지 URL
              </label>
              <input
                type="url"
                id="thumbnail"
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <ErrorMessage title="게시물 수정 실패" message={error} className="bg-red-500/10 border-red-500/30" />}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link
              href={`/posts/${id}`}
              className="flex-1 bg-[#3a404d] hover:bg-[#4a505c] text-white font-medium py-3 rounded-lg transition-colors text-center"
            >
              취소
            </Link>
            <button
              type="submit"
              className="flex-1 bg-[#6ee7b7] text-black font-bold py-3 rounded-lg hover:bg-[#5ad1a0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  게시물 수정 중...
                </>
              ) : (
                <>
                  <Save size={16} />
                  게시물 수정
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
