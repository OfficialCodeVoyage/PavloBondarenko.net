import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // List of paths to redirect to home
  const redirectPaths = [
    '/blog',
    '/blog-details',
    '/credentials',
    '/work-details'
  ];
  
  // Check if the current path starts with any of the redirect paths
  const shouldRedirect = redirectPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  if (shouldRedirect) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  // Only run middleware on these paths
  matcher: [
    '/blog/:path*',
    '/blog-details/:path*',
    '/credentials/:path*',
    '/work-details/:path*'
  ]
};