import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
export async function middleware(request: NextRequest) {
const path=request.nextUrl.pathname; 
const isPublicPath= path==='/auth'||path==='/booking'
const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! });
if (isPublicPath && token) {
  if (path === '/auth') {
      return NextResponse.redirect(new URL('/profile', request.url));
  }
  if (path === '/booking') {
      return NextResponse.next(); // Allow access
  }
}
if (path === '/booking' && !token) {
  return NextResponse.redirect(new URL('/auth', request.url));
}
if(!isPublicPath && !token ){
    return NextResponse.redirect(new URL('/auth', request.url))
}
}
export const config = {
  matcher: ['/booking','/profile','/auth','/dashboard'],
}