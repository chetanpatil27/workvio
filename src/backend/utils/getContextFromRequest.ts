import { NextRequest } from 'next/server';
import { ITenantCtx } from '../interface';


export function getContextFromRequest(request: NextRequest): ITenantCtx {
    const orgId = request.headers.get('x-org-id');
    if (!orgId) throw new Error('Missing orgId in request headers');
    return {
        userId: request.headers.get('x-user-id') ?? undefined,
        orgId,
    };
}
