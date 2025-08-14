import { NextRequest, NextResponse } from 'next/server';
import { DesignationService } from '@/backend/services/designation';
import { getContextFromRequest } from '@/backend/utils/getContextFromRequest';

// GET /api/v1/designation/[id] - Get single designation by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const tenantCtx = await getContextFromRequest(request);
        const designation = await DesignationService.findById(tenantCtx, params.id);
        if (!designation) {
            return NextResponse.json({ error: 'Designation not found' }, { status: 404 });
        }
        return NextResponse.json(designation);
    } catch (error) {
        console.error('GET /api/v1/designation/[id] error:', error);
        return NextResponse.json({ error: 'Failed to fetch designation' }, { status: 500 });
    }
}

// PATCH /api/v1/designation/[id] - Update designation by ID
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const tenantCtx = await getContextFromRequest(request);
        const data = await request.json();
        const designation = await DesignationService.update(tenantCtx, id, data);
        return NextResponse.json(designation);
    } catch (error) {
        console.error('PATCH /api/v1/designation/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update designation' }, { status: 500 });
    }
}

// DELETE /api/v1/designation/[id] - Delete designation by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const tenantCtx = await getContextFromRequest(request);
        const result = await DesignationService.delete(tenantCtx, params.id);
        return NextResponse.json(result);
    } catch (error) {
        console.error('DELETE /api/v1/designation/[id] error:', error);
        return NextResponse.json({ error: 'Failed to delete designation' }, { status: 500 });
    }
}
