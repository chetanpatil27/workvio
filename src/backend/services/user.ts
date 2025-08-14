import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { getTenantPrisma } from '../helper';
import { ITenantCtx } from '../interface';

export interface ICreateUserInput {
    email: string;
    name: string;
    password: string;
    role?: 'admin' | 'manager' | 'developer' | 'tester';
    designation?: string;
    employeeId?: string;
    phone?: string;
    address?: string;
    joiningDate?: Date;
}

export interface IUserFilters {
    // Search
    search?: string;

    // Basic filters
    id?: string;
    email?: string;
    role?: string | string[];
    designation?: string;
    active?: boolean;

    // Date filters
    joiningDateFrom?: Date;
    joiningDateTo?: Date;

    // Pagination
    page?: number;
    limit?: number;

    // Sorting
    sortBy?: 'name' | 'email' | 'createdAt' | 'joiningDate';
    sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedUsers {
    data: Array<{
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: string | null;
        active: boolean;
        designation: string | null;
        employeeId: string | null;
        phone: string | null;
        address: string | null;
        joiningDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface IUpdateProfileInput {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

export class UserService {
    static generateToken(userId: string, orgId: string): string {
        const secret = process.env.JWT_SECRET || 'changeme-secret';
        // Token expires in 7 days
        return jwt.sign({ userId, orgId }, secret, { expiresIn: '7d' });
    }
    // Authentication methods (replacing your methods.ts)
    static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(candidatePassword, hashedPassword);
        } catch (error) {
            console.error('Password comparison error:', error);
            return false;
        }
    }

    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds);
    }

    // User management operations (replacing your statics.ts)
    static async createUser(tenantCtx: ITenantCtx, data: ICreateUserInput) {
        const hashedPassword = await this.hashPassword(data.password);
        return await getTenantPrisma(tenantCtx).user.create({
            data: {
                email: data.email.toLowerCase().trim(),
                name: data.name.trim(),
                password: hashedPassword,
                active: true
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                active: true,
                designation: true,
                employeeId: true,
                phone: true,
                address: true,
                joiningDate: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    static async getUsers(tenantCtx: ITenantCtx, filters: IUserFilters = {}): Promise<IPaginatedUsers> {
        const {
            search,
            id,
            email,
            role,
            designation,
            active,
            joiningDateFrom,
            joiningDateTo,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = filters;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whereClause: Record<string, any> = {};
        if (id) {
            whereClause.id = id;
        }
        if (email) {
            whereClause.email = email.toLowerCase().trim();
        }

        // Search across multiple fields
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { employeeId: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (role) {
            const roles = Array.isArray(role) ? role : [role];
            whereClause.role = { in: roles };
        }
        if (designation) {
            whereClause.designation = designation;
        }
        if (active !== undefined) {
            whereClause.active = active;
        }
        // Date range filters
        if (joiningDateFrom || joiningDateTo) {
            whereClause.joiningDate = {};
            if (joiningDateFrom) {
                whereClause.joiningDate.gte = joiningDateFrom;
            }
            if (joiningDateTo) {
                whereClause.joiningDate.lte = joiningDateTo;
            }
        }
        // Calculate pagination
        const skip = (page - 1) * limit;
        // Build order by clause
        const orderBy: Record<string, 'asc' | 'desc'> = {};
        orderBy[sortBy] = sortOrder;

        const tenantPrisma = await getTenantPrisma(tenantCtx);
        // Execute queries
        const [users, total] = await Promise.all([
            tenantPrisma.user.findMany({
                where: whereClause,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    role: true,
                    active: true,
                    designation: true,
                    employeeId: true,
                    phone: true,
                    address: true,
                    joiningDate: true,
                    createdAt: true,
                    updatedAt: true
                },
                orderBy,
                skip,
                take: limit
            }),
            tenantPrisma.user.count({ where: whereClause })
        ]);
        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        return {
            data: users,
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
    static async findById(tenantCtx: ITenantCtx, userId: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                phone: true,
                address: true,
                updatedAt: true,
                active: true,
                dateOfBirth: true,
                createdAt: true,
                designation: true,
                employeeId: true,
                joiningDate: true
            }
        });
    }

    // User management actions (replacing your instance methods)
    static async changePassword(tenantCtx: ITenantCtx, userId: string, newPassword: string): Promise<void> {
        const hashedPassword = await this.hashPassword(newPassword);
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        await tenantPrisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
    }

    static async deactivateUser(tenantCtx: ITenantCtx, userId: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await tenantPrisma.$transaction(async (tx: any) => {
            // Deactivate user
            const user = await tx.user.update({
                where: { id: userId },
                data: { active: false }
            });

            // Remove from project assignments (following your Project -> Sprint -> Ticket structure)
            // Note: Uncomment these when you have the related models
            // await tx.projectMember.deleteMany({
            //   where: { userId }
            // });

            // Unassign from tickets
            // await tx.ticket.updateMany({
            //   where: { assigneeId: userId },
            //   data: { assigneeId: null }
            // });

            return user;
        });
    }

    static async activateUser(tenantCtx: ITenantCtx, userId: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.user.update({
            where: { id: userId },
            data: { active: true },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
                designation: true
            }
        });
    }

    static async updateDesignation(tenantCtx: ITenantCtx, userId: string, designation: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.user.update({
            where: { id: userId },
            data: { designation }
        });
    }

    static async updateProfile(tenantCtx: ITenantCtx, userId: string, data: IUpdateProfileInput) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        return await tenantPrisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                phone: true,
                address: true,
                updatedAt: true,
                active: true,
                dateOfBirth: true,
                createdAt: true,
                designation: true,
                employeeId: true,
                joiningDate: true
            }
        });
    }

    // Statistics (replacing your getUserStats static)
    static async getUserStats(tenantCtx: ITenantCtx) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        const [roleStats, statusStats, totalUsers] = await Promise.all([
            tenantPrisma.user.groupBy({
                by: ['role'],
                _count: { id: true },
                orderBy: { role: 'asc' }
            }),
            tenantPrisma.user.groupBy({
                by: ['active'],
                _count: { id: true }
            }),
            tenantPrisma.user.count()
        ]);

        return {
            roleStats,
            statusStats,
            totalUsers
        };
    }

    // Authentication helpers
    static async authenticateUser(tenantCtx: ITenantCtx, email: string, password: string) {
        const tenantPrisma = await getTenantPrisma(tenantCtx);
        const user = await tenantPrisma.user.findUnique({
            where: {
                email: email.toLowerCase().trim(),
                active: true
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                role: true,
                avatar: true,
                designation: true
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.id, tenantCtx.orgId);

        // Return user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    // Utility method for safe user data (replacing your toJSON override)
    static sanitizeUser(user: Record<string, unknown> | null) {
        if (!user) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }
}
