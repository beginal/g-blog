import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase';


export async function GET() {
  try {
    const request = new NextRequest('http://localhost:3000/api/posts');
    const { supabase } = createSupabaseRouteClient(request);
    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data: data || [], success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { supabase } = createSupabaseRouteClient(request);
    
    const body = await request.json();
    const { title, content, tags, description } = body;

    // 필수 필드 검증
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const postData = {
      title,
      content,
      description: description || '',
      tags: Array.isArray(tags) ? tags : [],
      date: new Date().toISOString().split('T')[0],
      author_id: 'anonymous',
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}