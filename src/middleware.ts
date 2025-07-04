// 임시 비활성화: 인증 관련 미들웨어
// TODO: 인증 시스템 재활성화 시 주석 해제
/*
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호된 경로 목록
  const protectedPaths = [
    '/posts/new',
    '/posts/[id]/edit',
    '/admin',
  ];

  // API 보호 경로 (메서드별)
  const protectedApiPaths = {
    POST: ['/api/posts'],
    PUT: ['/api/posts/[id]'],
    DELETE: ['/api/posts/[id]'],
  };

  const path = req.nextUrl.pathname;
  const method = req.method;
  
  // 보호된 경로인지 확인
  let isProtectedPath = protectedPaths.some(protectedPath => {
    if (protectedPath.includes('[id]')) {
      const regex = new RegExp(protectedPath.replace('[id]', '\\w+'));
      return regex.test(path);
    }
    return path.startsWith(protectedPath);
  });

  // API 경로 보호 확인 (메서드별)
  if (!isProtectedPath && protectedApiPaths[method as keyof typeof protectedApiPaths]) {
    isProtectedPath = protectedApiPaths[method as keyof typeof protectedApiPaths].some(apiPath => {
      if (apiPath.includes('[id]')) {
        const regex = new RegExp(apiPath.replace('[id]', '\\w+'));
        return regex.test(path);
      }
      return path === apiPath;
    });
  }

  // 보호된 경로에 접근하려는데 로그인하지 않은 경우
  if (isProtectedPath && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 로그인/회원가입 페이지에 접근하려는데 이미 로그인한 경우
  if ((path === '/login' || path === '/signup') && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}
*/

// 임시 비활성화: 모든 요청을 통과시킴
import { NextResponse } from 'next/server';

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};