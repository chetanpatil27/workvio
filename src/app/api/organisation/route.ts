import { NextRequest, NextResponse } from 'next/server';
import { OrganisationService } from '@/backend/services/organisation';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Validate input (add more validation as needed)
        if (!body.name || !body.adminUser) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const result = await OrganisationService.createOrganisation({
            name: body.name,
            adminUser: body.adminUser,
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Create Organisation Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const organisations = await OrganisationService.getAllOrganisations();
        return NextResponse.json(organisations, { status: 200 });
    } catch (error) {
        console.error('Get Organisations Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
