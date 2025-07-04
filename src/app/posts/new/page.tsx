"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload, Tag, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const imageUploadCallback = useCallback(async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("post-images") // Supabase Storage 버킷 이름
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);
      throw new Error("이미지 업로드에 실패했습니다.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  }, []);

  const mdeOptions = useMemo(() => {
    return {
      spellChecker: false,
      hideIcons: ["guide", "fullscreen", "side-by-side"],
      uploadImage: true,
      imageUploadFunction: imageUploadCallback,
    } as any;
  }, [imageUploadCallback]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          thumbnail,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "게시물 생성에 실패했습니다.");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>뒤로가기</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">새 게시물 작성</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="bg-[#2c313a] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3a404d]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Upload size={16} />
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
              placeholder="게시물 제목을 입력하세요"
              required
            />
          </div>

          {/* Content Editor */}
          <div>
            <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Upload size={16} />
              내용 (마크다운)
            </label>
            <div className="border border-[#4a505c] rounded-lg overflow-hidden">
              <SimpleMdeReact value={content} onChange={handleContentChange} options={mdeOptions} />
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
                onChange={(e) => setTags(e.target.value)}
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
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <ErrorMessage
              title="게시물 작성 실패"
              message={error}
              className="bg-red-500/10 border-red-500/30"
            />
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 bg-[#3a404d] hover:bg-[#4a505c] text-white font-medium py-3 rounded-lg transition-colors text-center"
            >
              취소
            </Link>
            <button
              type="submit"
              className="flex-1 bg-[#6ee7b7] text-black font-bold py-3 rounded-lg hover:bg-[#5ad1a0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  게시물 작성 중...
                </>
              ) : (
                "게시물 작성"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
