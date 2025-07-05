"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingCard from "@/components/ui/LoadingCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { fetchPost, createPost, updatePost } from "@/lib/api/post";
import { COLORS } from "@/config/constants";
import {
  EditorHeader,
  EditorTitleInput,
  EditorContent,
  EditorMetaInputs,
  EditorActions,
  EditorErrorMessage,
} from "@/components/molecules/editor";

interface PostEditorProps {
  mode: "create" | "edit";
  postId?: string; // edit mode일 때만 필요
}

export default function PostEditor({ mode, postId }: PostEditorProps) {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  
  // Loading & error states
  const [initialLoading, setInitialLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit mode: fetch initial data
  useEffect(() => {
    if (mode === "edit" && postId) {
      const loadPost = async () => {
        try {
          const post = await fetchPost(postId);
          
          setTitle(post.title);
          setTags(post.tags.join(", "));
          setThumbnail(post.thumbnail || "");
          setContent(post.content);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setInitialLoading(false);
        }
      };
      loadPost();
    }
  }, [mode, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const content = editorRef.current?.getInstance?.()?.getMarkdown();
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!content?.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const formData = {
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      thumbnail: thumbnail.trim(),
    };

    try {
      if (mode === "edit" && postId) {
        await updatePost(postId, formData);
        router.push(`/posts/${postId}`);
      } else {
        await createPost(formData);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (mode === "edit") {
      router.push(`/posts/${postId}`);
    } else {
      router.push("/");
    }
  };

  // Loading state for edit mode
  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
        <LoadingCard title="게시물 불러오는 중..." message="수정할 게시물을 불러오고 있습니다." />
      </div>
    );
  }

  // Error state for initial loading
  if (mode === "edit" && error && !title) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
        <ErrorMessage title="게시물 로딩 실패" message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      <EditorHeader mode={mode} onBack={handleCancel} />

      <div className="p-6 sm:p-8 rounded-2xl shadow-lg border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.surfaceLight }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EditorTitleInput
            mode={mode}
            value={title}
            onChange={setTitle}
            disabled={submitting}
          />

          <EditorContent
            ref={editorRef}
            mode={mode}
            initialValue={content}
          />

          <EditorMetaInputs
            tags={tags}
            thumbnail={thumbnail}
            onTagsChange={setTags}
            onThumbnailChange={setThumbnail}
            disabled={submitting}
          />

          {error && (
            <EditorErrorMessage
              mode={mode}
              message={error}
            />
          )}

          <EditorActions
            mode={mode}
            loading={submitting}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </div>
  );
}