import { getPosts } from "@/lib/api";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { BlogPostProps } from "@/types";


export const fetchPosts = async (): Promise<BlogPostProps[]> => {
  try {
    const response = await getPosts();
    
    if (!response.success || !response.data) {
      console.warn("API에서 포스트를 가져올 수 없습니다.");
      return [];
    }

    // API 응답을 BlogPostProps 타입에 맞게 변환
    return response.data.map(post => ({
      id: post.id,
      title: post.title,
      date: post.date || new Date().toISOString(),
      tags: post.tags || [],
      content: post.content,
      thumbnail: post.thumbnail,
      description: post.description || (post.content ? post.content.substring(0, 150) + "..." : ""),
    }));
  } catch (error) {
    console.error("포스트 조회 중 오류 발생:", error);
    return [];
  }
};

export const fetchPostById = async (id: string): Promise<BlogPostProps | null> => {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.warn(`ID ${id}의 포스트를 찾을 수 없습니다.`, error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      content: data.content,
      thumbnail: data.thumbnail,
      description: data.description || (data.content ? data.content.substring(0, 150) + "..." : ""),
    };
  } catch (error) {
    console.error(`포스트 ${id} 조회 중 오류 발생:`, error);
    return null;
  }
};
