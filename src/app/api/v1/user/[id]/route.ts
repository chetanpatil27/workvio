import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';
import { getContextFromRequest } from '@/backend/utils/getContextFromRequest';

// GET /api/users/[id] - Get user by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const tenantCtx = getContextFromRequest(request);
    try {
        const user = await UserService.findById(tenantCtx, id);

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
    const tenantCtx = getContextFromRequest(request);
    const { id } = await params;
    try {
        const body = await request.json();
        const user = await UserService.updateProfile(tenantCtx, id, body);

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
