import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase';

/**
 * API 응답 래퍼 함수들
 */
export function successResponse(data: any, status = 200) {
  return NextResponse.json({ data, success: true }, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message, success: false }, { status });
}

/**
 * API 핸들러 래퍼 - 공통 에러 처리 및 로깅
 */
export function withErrorHandler(handler: (request: NextRequest, context?: any) => Promise<any>) {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('API Error:', error);
      return errorResponse('Internal server error', 500);
    }
  };
}

/**
 * Supabase 클라이언트 생성 헬퍼
 */
export async function getSupabaseClient(request?: NextRequest) {
  if (request) {
    return createSupabaseRouteClient(request);
  }
  
  // 클라이언트 사이드에서 호출된 경우, 일반 클라이언트 반환
  if (typeof window !== 'undefined') {
    const { supabase } = await import('@/lib/supabase');
    return { supabase };
  }
  
  // 서버 컴포넌트에서 호출된 경우, 동적 쿠키 접근을 위해 클라이언트 생성
  const { createSupabaseServerClient } = await import('@/lib/supabase');
  const supabase = await createSupabaseServerClient();
  return { supabase };
}

/**
 * 요청 본문 파싱 및 검증
 */
export async function parseAndValidateBody(
  request: NextRequest, 
  requiredFields: string[] = []
): Promise<{ body: any; error?: NextResponse }> {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          body: null,
          error: errorResponse(`Missing required field: ${field}`, 400)
        };
      }
    }
    
    return { body };
  } catch {
    return {
      body: null,
      error: errorResponse('Invalid JSON body', 400)
    };
  }
}

/**
 * URL 파라미터 파싱
 */
export async function parseParams(params: Promise<any>): Promise<any> {
  return await params;
}

/**
 * Supabase 쿼리 헬퍼들
 */
export class SupabaseQueryBuilder {
  private supabase: any;
  private table: string;

  constructor(supabase: any, table: string) {
    this.supabase = supabase;
    this.table = table;
  }

  async findById(id: string) {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return { data: null, error: 'Record not found' };
    }

    return { data, error: null };
  }

  async findAll(orderBy = 'created_at', ascending = false) {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .order(orderBy, { ascending });

    return { data: data || [], error };
  }

  async create(createData: any) {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert([createData])
      .select()
      .single();

    return { data, error };
  }

  async update(id: string, updateData: any, allowedFields?: string[]) {
    let filteredData = updateData;
    
    if (allowedFields) {
      filteredData = {};
      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      }
      
      if (Object.keys(filteredData).length === 0) {
        return { data: null, error: 'No valid fields to update' };
      }
    }

    const { data, error } = await this.supabase
      .from(this.table)
      .update(filteredData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  async delete(id: string) {
    const { error } = await this.supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    return { error };
  }
}

/**
 * 인증 관련 헬퍼
 */
export class AuthHelper {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  async getSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session;
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getUser(token?: string) {
    if (token) {
      return await this.supabase.auth.getUser(token);
    }
    
    const session = await this.getSession();
    return { data: { user: session?.user || null }, error: null };
  }
}

/**
 * 파일 업로드 헬퍼
 */
export async function parseFormData(request: NextRequest, fileField = 'file') {
  try {
    const formData = await request.formData();
    const file = formData.get(fileField) as File;
    
    if (!file) {
      return { file: null, error: errorResponse(`No ${fileField} provided`, 400) };
    }
    
    return { file, error: null };
  } catch {
    return { file: null, error: errorResponse('Invalid form data', 400) };
  }
}

/**
 * 응답 헤더 설정 헬퍼
 */
export function createResponseWithHeaders(data: any, headers: HeadersInit = {}, status = 200) {
  return NextResponse.json(data, { status, headers });
}