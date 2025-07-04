import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  
  const { data: { session } } = await supabase.auth.getSession();

  return NextResponse.json({ 
    authenticated: !!session,
    user: session?.user || null 
  }, {
    headers: response.headers,
  });
}

export async function POST(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  const requestUrl = new URL(request.url);
  const action = requestUrl.searchParams.get('action');
  
  if (action === 'logout') {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true }, {
      headers: response.headers,
    });
  }

  if (action === 'login') {
    const body = await request.json();
    const { email, password } = body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      user: data.user 
    }, {
      headers: response.headers,
    });
  }

  if (action === 'signup') {
    const body = await request.json();
    const { email, password } = body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true,
      user: data.user,
      needsEmailVerification: data.user && !data.session 
    }, {
      headers: response.headers,
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}