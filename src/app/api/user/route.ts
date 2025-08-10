import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// GET /api/user - Get users with filters
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
        console.error('GET /api/user error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST /api/user - Create new user
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
        console.error('POST /api/user error:', error);

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

// PATCH /api/user - Update user profile (bulk operations)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, action, ...data } = body;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        let result;

        switch (action) {
            case 'deactivate':
                result = await UserService.deactivateUser(userId);
                break;
            case 'activate':
                result = await UserService.activateUser(userId);
                break;
            case 'change-password':
                if (!data.password) {
                    return NextResponse.json(
                        { error: 'Password is required' },
                        { status: 400 }
                    );
                }
                await UserService.changePassword(userId, data.password);
                result = { message: 'Password updated successfully' };
                break;
            case 'update-designation':
                if (!data.designationId) {
                    return NextResponse.json(
                        { error: 'Designation ID is required' },
                        { status: 400 }
                    );
                }
                result = await UserService.updateDesignation(userId, data.designationId);
                break;
            case 'update-profile':
                result = await UserService.updateProfile(userId, data);
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('PATCH /api/user error:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}
