import { NextRequest, NextResponse } from 'next/server';
import { DesignationService, ICreateDesignationInput, IDesignationFilters } from '@/backend/services/designation';
import { getContextFromRequest } from '@/backend/utils/getContextFromRequest';

// GET /api/v1/designation - Get all designations with advanced filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || undefined;
        const name = searchParams.get('name') || undefined;
        const active = searchParams.get('active') ? searchParams.get('active') === 'true' : undefined;
        const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined;
        const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
        const sortBy = searchParams.get('sortBy') || undefined;
        const sortOrder = searchParams.get('sortOrder') || undefined;
        const tenantCtx = await getContextFromRequest(request);
        const filters: IDesignationFilters = {
            search,
            name,
            active,
            page,
            limit,
            sortBy: sortBy as 'name' | 'createdAt' | undefined,
            sortOrder: sortOrder as 'asc' | 'desc' | undefined
        };
        const designations = await DesignationService.get(tenantCtx, filters);
        return NextResponse.json(designations);
    } catch (error) {
        console.error('GET /api/v1/designation error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch designations' },
            { status: 500 }
        );
    }
}

// POST /api/v1/designation - Create new designation
export async function POST(request: NextRequest) {
    try {
        const body: ICreateDesignationInput = await request.json();
        if (!body.name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }
        const tenantCtx = await getContextFromRequest(request);
        const designation = await DesignationService.create(tenantCtx, body);
        return NextResponse.json(designation);
    } catch (error) {
        console.error('POST /api/v1/designation error:', error);
        return NextResponse.json(
            { error: 'Failed to create designation' },
            { status: 500 }
        );
    }
}

