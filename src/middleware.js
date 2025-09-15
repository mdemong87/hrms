import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';


/***************  Specify protected routes *******************/
const protectedRoutes = ['/admin', '/hr', '/projectmanager', '/employee', '/attendance', '/calendar', '/profile', '/holidays', '/leave', '/announcement']




/************** Verify the jwt token function *************/
async function verifyJWT(token) {
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET); // make sure you set this
        const { payload } = await jwtVerify(token, secret);
        return payload; // valid token → return payload
    } catch (err) {
        console.log(err);
        return null; // invalid or expired
    }
}




export default async function middleware(req) {


    /********** Check if the current route is protected or public *********/
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);


    /************ Get cookie from request **********/
    const token = req.cookies.get('token')?.value;
    const role = req.cookies.get('role')?.value;



    /************* if have token the check the validity  ************/
    let decoded = null;
    if (token) {
        decoded = await verifyJWT(token);
    }


    /************* Check if the user not log in but access protected route *************/
    if (isProtectedRoute && !decoded) {
        const response = NextResponse.redirect(new URL('/signin', req.nextUrl));
        return response;
    }


    /************* Check if path starts with any of the given prefixes *************/
    const startsWithProtectedPrefix = ['/admin', '/hr', '/projectmanager', '/employee',]
        .some(prefix => path.startsWith(prefix));



    /************* if user is not login but try to access protect routes and the route start with protected route then redirect to the signin page ************/
    if (!decoded && startsWithProtectedPrefix) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    /*************************** handly check if the user access other role dashboard then redirect to the signin page *******************************/
    if (role != "Admin" && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Hr" && path.startsWith('/hr')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Project Manager" && path.startsWith('/projectmanager')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    } else if (role != "Employee" && path.startsWith('/employee')) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    /*************************** if the user in login but hit the signin page the redirect to the deshboard pagte *******************************/
    if (decoded && role && path.startsWith('/signin')) {
        if (role === 'Admin') {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        } else if (role === 'Hr') {
            return NextResponse.redirect(new URL('/hr', req.nextUrl));
        } else if (role === 'Project Manager') {
            return NextResponse.redirect(new URL('/projectmanager', req.nextUrl));
        } else if (role === 'Employee') {
            return NextResponse.redirect(new URL('/employee', req.nextUrl));
        }
    }


    /************* final next call *************/
    return NextResponse.next();

}


/**************** Routes Middleware should not run on *****************/
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}





