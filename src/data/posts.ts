import { supabase } from "@/lib/supabase";
import type { BlogPostProps } from "@/types";

export const fetchPosts = async (): Promise<BlogPostProps[]> => {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  // Supabase에서 가져온 데이터를 BlogPostProps 타입에 맞게 변환
  return data.map(post => ({
    id: post.id,
    title: post.title,
    date: post.date,
    tags: post.tags || [], // tags가 없을 경우 빈 배열
    content: post.content,
    quest: post.quest || undefined, // quest가 없을 경우 undefined
  }));
};
