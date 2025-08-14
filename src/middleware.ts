import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './backend/token-helper';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Exclude public/auth routes
    if (['/api/organisation', '/api/auth', '/auth/login'].some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    const payload = await verifyToken(token);
    if (payload && payload.userId && payload.orgId) {
        const response = NextResponse.next();
        response.headers.set('x-user-id', payload.userId);
        response.headers.set('x-org-id', payload.orgId);
        return response;
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
    matcher: ['/api/:path*',],
};