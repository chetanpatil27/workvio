import { prisma } from '@/backend/prisma';
import { createTenantDatabase } from './tenant';

export interface CreateOrganisationInput {
    name: string;
    adminUser: { email: string; name: string; password: string; };
}

function generateOrgId(name: string, number: number): string {
    const initials = name
        .split(' ').filter((_, index) => index < 2) // Limit to first two words for initials
        .map(word => word[0].toUpperCase())
        .join('');
    return `${initials}${number}`;
}

export class OrganisationService {
    static async createOrganisation(input: CreateOrganisationInput) {
        const initials = input.name
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('');
        const existingCount = await prisma.organisation.count({
            where: {
                orgId: { startsWith: initials }
            }
        });
        const orgId = generateOrgId(input.name, existingCount + 1001); // Start from 1001
        const organisation = await prisma.organisation.create({
            data: { name: input.name, orgId, active: true, },
        });
        const adminUserDoc = {
            email: input.adminUser.email,
            name: input.adminUser.name,
            password: input.adminUser.password,
            role: 'admin',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const dbName = await createTenantDatabase(orgId, adminUserDoc);
        const updatedOrganisation = await prisma.organisation.update({
            where: { id: organisation.id },
            data: { dbName }
        });
        return {
            organisation: {
                id: updatedOrganisation.id,
                name: updatedOrganisation.name,
                orgId: updatedOrganisation.orgId,
                active: updatedOrganisation.active,
                createdAt: updatedOrganisation.createdAt,
                updatedAt: updatedOrganisation.updatedAt,
            }
        };
    }

    static async getAllOrganisations({
        search = '',
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
    }: {
        search?: string;
        page?: number;
        limit?: number;
        sortBy?: 'name' | 'createdAt' | 'updatedAt';
        sortOrder?: 'asc' | 'desc';
    } = {}) {
        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }

        const skip = (page - 1) * limit;
        const orderBy: Record<string, 'asc' | 'desc'> = {};
        orderBy[sortBy] = sortOrder;

        const [organisations, total] = await Promise.all([
            prisma.organisation.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            }),
            prisma.organisation.count({ where }),
        ]);

        return {
            data: organisations,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        };
    }
    static async verify(orgId: string): Promise<boolean> {
        const org = await prisma.organisation.findUnique({ where: { orgId: orgId } });
        return !!org;
    }
}
