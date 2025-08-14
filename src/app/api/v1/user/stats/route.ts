import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';
import { getContextFromRequest } from '@/backend/utils/getContextFromRequest';

// GET /api/users/stats - Get user statistics
export async function GET(request: NextRequest) {
    try {
        // Next.js API route doesn't provide request in GET signature, workaround: get orgId from headers or context
        // If you need request, update the route to accept it as a parameter
        // For now, fallback to empty orgId
        const tenantCtx = getContextFromRequest(request);
        const stats = await UserService.getUserStats(tenantCtx);
        return NextResponse.json(stats);
    } catch (error) {
        console.error('GET /api/users/stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user statistics' },
            { status: 500 }
        );
    }
}
