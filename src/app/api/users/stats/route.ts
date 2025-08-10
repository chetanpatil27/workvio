import { NextResponse } from 'next/server';
import { UserService } from '@/backend/services/user';

// GET /api/users/stats - Get user statistics
export async function GET() {
    try {
        const stats = await UserService.getUserStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('GET /api/users/stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user statistics' },
            { status: 500 }
        );
    }
}
