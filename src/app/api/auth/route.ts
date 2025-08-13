import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// POST /api/auth/login - User authentication
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log("----------email, password", email, password)
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        try {
            const user = await UserService.authenticateUser(email, password, body.orgId);

            // Set token as a secure, HTTP-only cookie
            const response = NextResponse.json({
                user: user.user,
                token: user.token,
                message: 'Login successfull'
            });
            response.cookies.set('token', user.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });
            return response;
        } catch (authError) {
            console.error('Authentication error:', authError);
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('POST /api/auth/login error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
}
