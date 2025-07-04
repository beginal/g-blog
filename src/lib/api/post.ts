import type { BlogPostProps } from "@/types";
import api from "../utils/callApi";

export interface PostFormData {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
}

/**
 * 모든 게시물 조회
 */
export async function fetchPosts(): Promise<BlogPostProps[]> {
  return api.get<BlogPostProps[]>("/api/posts", {
    errorMessage: "게시물 목록을 불러오는데 실패했습니다."
  });
}

/**
 * 게시물 조회
 */
export async function fetchPost(postId: string): Promise<BlogPostProps> {
  return api.get<BlogPostProps>(`/api/posts/${postId}`, {
    errorMessage: "게시물을 불러오는데 실패했습니다."
  });
}

/**
 * 게시물 생성
 */
export async function createPost(formData: PostFormData): Promise<BlogPostProps> {
  return api.post<BlogPostProps>("/api/posts", formData, {
    errorMessage: "게시물 생성에 실패했습니다."
  });
}

/**
 * 게시물 수정
 */
export async function updatePost(postId: string, formData: PostFormData): Promise<BlogPostProps> {
  return api.put<BlogPostProps>(`/api/posts/${postId}`, formData, {
    errorMessage: "게시물 수정에 실패했습니다."
  });
}

/**
 * 게시물 삭제
 */
export async function deletePost(postId: string) {
  return api.delete(`/api/posts/${postId}`, {
    errorMessage: "게시물 삭제에 실패했습니다."
  });
}