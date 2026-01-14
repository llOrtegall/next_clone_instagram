import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const publicRoutes = ['/', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (rutas de autenticación de NextAuth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (archivos públicos)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
