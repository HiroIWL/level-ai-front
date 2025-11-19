import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    const { pathname } = req.nextUrl;
    const publicRoutes = [
        '/login',
        '/register',
        '/termos-registro',
        '/_next',
        '/favicon.ico',
        '/public',
        '/static',
        '/api',
    ];

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const isPublicPath =
        pathname === '/' ||
        publicRoutes.some((route) => pathname.startsWith(route));

    if (isPublicPath && !token) {
        return NextResponse.next();
    }

    if (
        token &&
        (pathname === '/' || pathname === '/login' || pathname === '/register')
    ) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (!token) {
        console.log(isPublicPath, pathname);
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
