import { NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/hr', '/projectmanager', '/employee', '/attendance', '/calendar', '/profile', '/holidays', '/leave', '/announcement']


export default async function middleware(req) {


    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);


    // Get cookie from request (Edge API)
    const token = req.cookies.get('token')?.value;
    const role = req.cookies.get('role')?.value;



    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }


    // Check if path starts with any of the given prefixes
    const startsWithProtectedPrefix = ['/admin', '/hr', '/projectmanager', '/employee']
        .some(prefix => path.startsWith(prefix));


    if (!token && startsWithProtectedPrefix) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }


    if (role != "admin" && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "hr" && path.startsWith('/hr')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "projectmanager" && path.startsWith('/projectmanager')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "employee" && path.startsWith('/employee')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    return NextResponse.next();

}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}