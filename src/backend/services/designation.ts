
import { getTenantPrisma } from '../helper';
import { IPagination, ITenantCtx } from '../interface';

export interface ICreateDesignationInput {
    name: string;
    description?: string;
    department?: string;
}

export interface IDesignationFilters {
    search?: string;
    id?: string;
    name?: string;
    active?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedDesignations {
    data: Array<{
        id: string;
        name: string;
        description?: string | null;
        department?: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    pagination: IPagination;
}

export interface IUpdateDesignationInput {
    name?: string;
    description?: string;
    active?: boolean;
}

export class DesignationService {
    static async create(tenantCtx: ITenantCtx, data: ICreateDesignationInput) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        // Check for existing designation with the same name
        const existing = await tenantPrisma.designation.findUnique({
            where: { name: data.name.trim() }
        });
        if (existing) {
            return {
                errors: { name: 'Designation name must be unique.' },
                status: 400
            };
        }
        return await tenantPrisma.designation.create({
            data: {
                name: data.name.trim(),
                description: data.description,
                department: data.department,
                active: true
            },
        });
    }

    static async get(tenantCtx: ITenantCtx, filters: IDesignationFilters = {}): Promise<IPaginatedDesignations> {
        const {
            search,
            id,
            name,
            active,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = filters;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whereClause: Record<string, any> = {};
        if (id) whereClause.id = id;
        if (name) whereClause.name = name.trim();
        if (active !== undefined) whereClause.active = active;
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const skip = (page - 1) * limit;
        const orderBy: Record<string, 'asc' | 'desc'> = {};
        orderBy[sortBy] = sortOrder;
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        const [designations, total] = await Promise.all([
            tenantPrisma.designation.findMany({
                where: whereClause,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    department: true,
                    active: true,
                    createdAt: true,
                    updatedAt: true
                },
                orderBy,
                skip,
                take: limit
            }),
            tenantPrisma.designation.count({ where: whereClause })
        ]);
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;
        return {
            data: designations,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasNext,
                hasPrev
            }
        };
    }

    static async findById(tenantCtx: ITenantCtx, designationId: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.designation.findUnique({
            where: { id: designationId },
        });
    }

    static async update(tenantCtx: ITenantCtx, designationId: string, data: IUpdateDesignationInput) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.designation.update({
            where: { id: designationId },
            data,
        });
    }

    static async delete(tenantCtx: ITenantCtx, designationId: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.designation.delete({
            where: { id: designationId }
        });
    }

    // Example: get ref from user service
    static async getDesignationWithUser(tenantCtx: ITenantCtx, designationId: string, userId: string) {
        const designation = await this.findById(tenantCtx, designationId);
        const user = await import('./user').then(m => m.UserService.findById(tenantCtx, userId));
        return { designation, user };
    }
}
