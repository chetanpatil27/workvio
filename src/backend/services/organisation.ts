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

export class OrganisationService {
    /**
     * Create a new organisation and its admin user
     * - Creates organisation in the main DB (shared via Prisma)
     * - Optionally, you can trigger tenant DB creation logic here if needed
     */
    static async createOrganisation(input: CreateOrganisationInput) {
        // 1. Create organisation in main DB
        const organisation = await prisma.organisation.create({
            data: {
                name: input.name,
                // Add more fields as needed
            },
        });

        // 2. Create admin user in the tenant DB
        const adminUserDoc = {
            email: input.adminUser.email,
            name: input.adminUser.name,
            password: input.adminUser.password, // Should be hashed before insert in production
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await createTenantDatabase(organisation.id, adminUserDoc);

        // 3. Return organisation info (admin user is in tenant DB)
        return { organisation };
    }

    /**
     * Get organisations with filtering, searching, and pagination
     */
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
}
