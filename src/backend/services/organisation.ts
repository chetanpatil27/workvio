import { prisma } from '@/backend/prisma';
import { UserService } from './user';
import { createTenantDatabase } from './tenant';

export interface CreateOrganisationInput {
    name: string;
    adminUser: {
        email: string;
        name: string;
        password: string;
        // Add more fields as needed
    };
}

function generateOrgId(name: string, number: number): string {
    // Get initials (e.g., "Acme Corp" -> "AC")
    const initials = name
        .split(' ')
        .map(word => word[0].toUpperCase())
        .join('');
    return `${initials}${number}`;
}

export class OrganisationService {
    static async createOrganisation(input: CreateOrganisationInput) {
        // Find the current count for this initials to ensure uniqueness
        const initials = input.name
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('');
        const existingCount = await prisma.organisation.count({
            where: {
                orgId: { startsWith: initials }
            }
        });
        const orgId = generateOrgId(input.name, existingCount + 101); // Start from 101

        // 1. Create organisation in main DB
        const organisation = await prisma.organisation.create({
            data: {
                name: input.name,
                orgId, // new unique field
                active: true,
            },
        });

        // 2. Create admin user in the tenant DB
        const adminUserDoc = {
            email: input.adminUser.email,
            name: input.adminUser.name,
            password: input.adminUser.password,
            role: 'admin',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        console.log("----------At before db create")
        // Assume createTenantDatabase returns the db name
        const dbName = await createTenantDatabase(orgId, adminUserDoc);
        console.log("---------at db create", dbName);
        // 3. Update organisation with dbName
        const updatedOrganisation = await prisma.organisation.update({
            where: { id: organisation.id },
            data: { dbName }
        });
        console.log("updatedOrganisation", updatedOrganisation)
        // 4. Return organisation info
        return {
            organisation: {
                id: updatedOrganisation.id,
                name: updatedOrganisation.name,
                orgId: updatedOrganisation.orgId,
                dbName: updatedOrganisation.dbName,
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
        console.log("org", org)
        return org;
    }
}
