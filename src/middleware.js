import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';


// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/hr', '/projectmanager', '/employee', '/attendance', '/calendar', '/profile', '/holidays', '/leave', '/announcement']





async function verifyJWT(token) {
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET); // make sure you set this
        const { payload } = await jwtVerify(token, secret);
        return payload; // valid token → return payload
    } catch (err) {
        return null; // invalid or expired
    }
}




export default async function middleware(req) {


    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);


    // Get cookie from request (Edge API)
    const token = req.cookies.get('token')?.value;
    const role = req.cookies.get('role')?.value;


    let decoded = null;

    if (token) {
        decoded = await verifyJWT(token);
    }


    if (isProtectedRoute && !decoded) {
        const response = NextResponse.redirect(new URL('/signin', req.nextUrl));
        return response;
    }


    // Check if path starts with any of the given prefixes
    const startsWithProtectedPrefix = ['/admin', '/hr', '/projectmanager', '/employee']
        .some(prefix => path.startsWith(prefix));


    if (!decoded && startsWithProtectedPrefix) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    if (role != "Admin" && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Hr" && path.startsWith('/hr')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Projectmanager" && path.startsWith('/projectmanager')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Employee" && path.startsWith('/employee')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    if (decoded && role && path.startsWith('/signin')) {
        if (role === 'Admin') {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        } else if (role === 'Hr') {
            return NextResponse.redirect(new URL('/hr', req.nextUrl));
        } else if (role === 'Projectmanager') {
            return NextResponse.redirect(new URL('/projectmanager', req.nextUrl));
        } else if (role === 'Employee') {
            return NextResponse.redirect(new URL('/employee', req.nextUrl));
        }
    }

    return NextResponse.next();

}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}





