import type { BlogPostProps } from "@/types";
import { 
  getSupabaseClient, 
  SupabaseQueryBuilder
} from '@/lib/api-utils';

/**
 * 모든 게시물 조회 (서버사이드에서 사용)
 */
export const fetchPosts = async (): Promise<BlogPostProps[]> => {
  try {
    console.log("포스트 목록 조회 시작");
    
    // Supabase 클라이언트 가져오기 (클라이언트/서버 자동 감지)
    const { supabase } = await getSupabaseClient();
    const queryBuilder = new SupabaseQueryBuilder(supabase, 'posts');
    
    const { data, error } = await queryBuilder.findAll('created_at', false);
    
    if (error) {
      console.error("포스트 목록 조회 에러:", error);
      return [];
    }

    // 데이터 변환: BlogPostProps 타입에 맞게 변환
    const transformedData = (data || []).map((post: any) => ({
      id: post.id,
      title: post.title || '',
      tags: post.tags || [],
      content: post.content || '',
      thumbnail: post.thumbnail || post.description || '',
      created_at: post.created_at,
      updated_at: post.updated_at,
      quest: post.quest
    }));

    console.log("포스트 목록 조회 완료:", transformedData.length, "개");
    return transformedData;
  } catch (error: any) {
    console.error("포스트 조회 중 오류 발생:", {
      message: error.message,
      stack: error.stack,
      error
    });
    return [];
  }
};

/**
 * 특정 게시물 조회 (서버사이드에서 사용)
 */
export const fetchPostById = async (id: string): Promise<BlogPostProps | null> => {
  try {
    console.log(`포스트 ${id} 조회 시작`);
    
    // Supabase 클라이언트 가져오기 (클라이언트/서버 자동 감지)
    const { supabase } = await getSupabaseClient();
    const queryBuilder = new SupabaseQueryBuilder(supabase, 'posts');
    
    const { data, error } = await queryBuilder.findById(id);
    
    if (error) {
      console.log(`포스트 ${id}를 찾을 수 없습니다.`);
      return null;
    }

    // 데이터 변환: BlogPostProps 타입에 맞게 변환
    const transformedData: BlogPostProps = {
      id: data.id,
      title: data.title || '',
      tags: data.tags || [],
      content: data.content || '',
      thumbnail: data.thumbnail || data.description || '',
      created_at: data.created_at,
      updated_at: data.updated_at,
      quest: data.quest
    };

    console.log(`포스트 ${id} 조회 완료`);
    return transformedData;
  } catch (error: any) {
    console.error(`포스트 ${id} 조회 중 오류 발생:`, error);
    return null;
  }
};
