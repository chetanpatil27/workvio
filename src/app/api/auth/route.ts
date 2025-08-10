import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// POST /api/auth/login - User authentication
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        try {
            const user = await UserService.authenticateUser(email, password);

            // In a real app, you would generate and return a JWT token here
            return NextResponse.json({
                user,
                message: 'Login successful'
            });
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
