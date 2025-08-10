import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// GET /api/users - Get all users with advanced filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || undefined;
        const role = searchParams.get('role')?.split(',') || undefined;
        const designation = searchParams.get('designation') || undefined;
        const isActive = searchParams.get('isActive') ? searchParams.get('isActive') === 'true' : undefined;

        const users = await UserService.searchUsers({
            search,
            role,
            designation,
            isActive
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('GET /api/users error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.email || !body.name || !body.password) {
            return NextResponse.json(
                { error: 'Email, name, and password are required' },
                { status: 400 }
            );
        }

        const user = await UserService.createUser(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error: unknown) {
        console.error('POST /api/users error:', error);

        // Handle Prisma unique constraint violation
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
