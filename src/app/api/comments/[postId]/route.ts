import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase';
import { CommentsListResponse } from '@/types/comment.types';

interface RouteParams {
  params: Promise<{ postId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;

    if (!postId) {
      return NextResponse.json({
        success: false,
        error: '게시물 ID가 필요합니다.'
      } as CommentsListResponse, { status: 400 });
    }

    const { supabase } = createSupabaseRouteClient(request);

    // 댓글 목록 조회 (오래된순으로 정렬)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Comments fetch error:', error);
      return NextResponse.json({
        success: false,
        error: '댓글을 불러오는데 실패했습니다.'
      } as CommentsListResponse, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: data || []
    } as CommentsListResponse);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    } as CommentsListResponse, { status: 500 });
  }
}