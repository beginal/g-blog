import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase';
import { validateCommentForm, sanitizeInput } from '@/utils/validation';
import { CommentCreateRequest, CommentResponse } from '@/types/comment.types';

export async function POST(request: NextRequest) {
  try {
    const body: CommentCreateRequest = await request.json();
    const { post_id, nickname, content } = body;

    // 입력값 검증
    const validation = validateCommentForm(nickname, content);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: validation.errors.join(' ')
      } as CommentResponse, { status: 400 });
    }

    // post_id 검증
    if (!post_id) {
      return NextResponse.json({
        success: false,
        error: '게시물 ID가 필요합니다.'
      } as CommentResponse, { status: 400 });
    }

    const { supabase } = createSupabaseRouteClient(request);

    // 게시물 존재 여부 확인
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .single();

    if (postError || !post) {
      return NextResponse.json({
        success: false,
        error: '존재하지 않는 게시물입니다.'
      } as CommentResponse, { status: 404 });
    }

    // 댓글 생성
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id,
        nickname: sanitizeInput(nickname),
        content: sanitizeInput(content),
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown'
      })
      .select()
      .single();

    if (error) {
      console.error('Comment creation error:', error);
      return NextResponse.json({
        success: false,
        error: '댓글 작성에 실패했습니다.'
      } as CommentResponse, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    } as CommentResponse);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다.'
    } as CommentResponse, { status: 500 });
  }
}