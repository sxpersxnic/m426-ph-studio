import { decrypt } from "@/lib/authentication/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Protected, Public, Private routes
const protectedRoutes = ['/m426/blog', '/m426/blog/create', '/m426/blog/profile', '/m426/blog/search', '/m426/blog/[id]/edit', '/m426/blog/[id]/delete', '/m426/blog/[id]/post'];
const publicRoutes = ['/m426/auth/login', '/m426/auth/signup', '/'];
const privateRoutes = ['/dev/*', '/lib/*', '/ui/*', '/seed/*', '/api/*'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected, public or private
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  // 5. Redirect to /m426/auth/login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/m426/auth/login', req.nextUrl))
  }

  // 6. Redirect to /m426/blog if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/m426/blog')
  ) {
    return NextResponse.redirect(new URL('/m426/blog', req.nextUrl))
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|dev|seed|.*\\.png$).*)'],
}