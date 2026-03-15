import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/signup'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);

  // If trying to access hidden protected route without a token
  if (!token && !isPublicRoute) {
    if (path.startsWith('/api/') || path.startsWith('/_next/')) {
       return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login/signup while already authenticated
  if (token && (path === '/login' || path === '/signup' || path === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
