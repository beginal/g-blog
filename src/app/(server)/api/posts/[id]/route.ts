import { NextRequest } from 'next/server';
import { 
  withErrorHandler, 
  getSupabaseClient, 
  SupabaseQueryBuilder, 
  successResponse, 
  errorResponse,
  parseParams 
} from '@/lib/api-utils';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: RouteParams
) => {
  const { id } = await parseParams(params);
  const { supabase } = await getSupabaseClient(request);
  const queryBuilder = new SupabaseQueryBuilder(supabase, 'posts');
  
  const { data, error } = await queryBuilder.findById(id);
  
  if (error) {
    return errorResponse('Post not found', 404);
  }

  // 데이터 변환: BlogPostProps 타입에 맞게 변환
  const transformedData = {
    id: data.id,
    title: data.title || '',
    tags: data.tags || [],
    content: data.content || '',
    thumbnail: data.thumbnail || data.description || '',
    created_at: data.created_at,
    updated_at: data.updated_at,
    quest: data.quest
  };

  return successResponse(transformedData);
});

export const PUT = withErrorHandler(async (
  request: NextRequest,
  { params }: RouteParams
) => {
  const { id } = await parseParams(params);
  const { supabase } = await getSupabaseClient(request);
  const queryBuilder = new SupabaseQueryBuilder(supabase, 'posts');
  
  const body = await request.json();
  console.log('PUT 요청 body:', body);
  console.log('POST ID:', id);
  
  // description과 thumbnail 필드는 실제 DB에 없으므로 제거
  const allowedFields = ['title', 'content', 'tags'];
  
  // description, thumbnail 필드 제거 (DB에 존재하지 않음)
  if (body.description !== undefined) {
    delete body.description;
  }
  if (body.thumbnail !== undefined) {
    delete body.thumbnail;
  }
  
  console.log('변환된 body:', body);
  
  const { data, error } = await queryBuilder.update(id, body, allowedFields);
  
  console.log('업데이트 결과:', { data, error });
  
  if (error) {
    console.error('업데이트 에러:', error);
    if (error === 'No valid fields to update') {
      return errorResponse(error, 400);
    }
    throw new Error(error.message || JSON.stringify(error));
  }

  return successResponse(data);
});

export const DELETE = withErrorHandler(async (
  request: NextRequest,
  { params }: RouteParams
) => {
  const { id } = await parseParams(params);
  const { supabase } = await getSupabaseClient(request);
  const queryBuilder = new SupabaseQueryBuilder(supabase, 'posts');
  
  const { error } = await queryBuilder.delete(id);
  
  if (error) {
    throw new Error(error.message || JSON.stringify(error));
  }

  return successResponse({ message: 'Post deleted successfully' });
});