import { OrganisationService } from '@/backend/services/organisation';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const { orgId } = await req.json();

    const data = await OrganisationService.verify(orgId);

    if (!data) {
        return NextResponse.json({ verified: false, error: 'Invalid organisation.' }, { status: 401 });
    }

    return NextResponse.json({ data });
}