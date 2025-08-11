import { NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/attendance', '/calendar', '/profile', '/holidays', '/leave', '/announcement']
const publicRoutes = ['/signin', '/signup']

export default async function middleware(req) {

    // console.log(req);

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Get cookie from request (Edge API)
    const token = req.cookies.get('token')?.value;
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    if (isPublicRoute && token && !req.nextUrl.pathname.startsWith('/')) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();

}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}