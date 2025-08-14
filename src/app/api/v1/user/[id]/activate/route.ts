import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';
import { getContextFromRequest } from '@/backend/utils/getContextFromRequest';

// PATCH /api/users/[id]/activate - Activate user
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Get tenant context from request
        const tenantCtx = getContextFromRequest(request);
        const user = await UserService.activateUser(tenantCtx, params.id);
        return NextResponse.json(user);
    } catch (error: unknown) {
        console.error('PATCH /api/users/[id]/activate error:', error);

        // Handle user not found
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to activate user' },
            { status: 500 }
        );
    }
}
