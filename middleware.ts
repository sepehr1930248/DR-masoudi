// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/appointments'];
  
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get token from cookie or header
    const token = request.cookies.get('authToken')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to home page if no token
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Token is valid, continue to the route
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow access to non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/appointments/:path*']
};

