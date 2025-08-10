import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// GET /api/users/[id] - Get user by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await UserService.findById(params.id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('GET /api/users/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

// PATCH /api/users/[id] - Update user profile
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const user = await UserService.updateProfile(params.id, body);

        return NextResponse.json(user);
    } catch (error: unknown) {
        console.error('PATCH /api/users/[id] error:', error);

        // Handle user not found
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE /api/users/[id] - Deactivate user (soft delete)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await UserService.deactivateUser(params.id);
        return NextResponse.json(user);
    } catch (error: unknown) {
        console.error('DELETE /api/users/[id] error:', error);

        // Handle user not found
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to deactivate user' },
            { status: 500 }
        );
    }
}
