import * as jwt from 'jsonwebtoken';
import { prisma } from '@/backend/prisma';
import * as bcrypt from 'bcryptjs';

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
        role: string;
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

/**
 * UserService - Unified user management with filtering and pagination
 * 
 * Main Methods:
 * - getUsers(): Primary method with flexible filtering, searching, and pagination
 * - createUser(): Create new user
 * - authenticateUser(): Login authentication
 * - updateProfile(), updateDesignation(), changePassword(): User updates
 * - activateUser(), deactivateUser(): User status management
 * 
 * Legacy convenience methods (use getUsers() for new code):
 * - findByEmail(), findById(), findActiveUsers(), findByRole()
 */
export class UserService {
    /**
     * Generate JWT token for authentication
     * @param userId - User's unique ID
     * @returns JWT token string
     */
    static generateToken(userId: string): string {
        const secret = process.env.JWT_SECRET || 'changeme-secret';
        // Token expires in 7 days
        return jwt.sign({ userId }, secret, { expiresIn: '7d' });
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
    static async createUser(data: ICreateUserInput) {
        const hashedPassword = await this.hashPassword(data.password);
        console.log("createUser data", data);
        return await prisma.user.create({
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

    /**
     * Unified user retrieval with filtering, searching, and pagination
     * 
     * @example
     * // Get all active users with pagination
     * const result = await UserService.getUsers({ active: true, page: 1, limit: 10 });
     * 
     * // Search users by name/email
     * const result = await UserService.getUsers({ search: "john", page: 1, limit: 10 });
     * 
     * // Filter by role and designation
     * const result = await UserService.getUsers({ 
     *   role: ["developer", "tester"], 
     *   designation: "Senior Developer",
     *   active: true,
     *   page: 1, 
     *   limit: 20 
     * });
     * 
     * // Get single user by email
     * const result = await UserService.getUsers({ email: "user@example.com" });
     * const user = result.users[0];
     * 
     * // Date range filter
     * const result = await UserService.getUsers({
     *   joiningDateFrom: new Date('2024-01-01'),
     *   joiningDateTo: new Date('2024-12-31'),
     *   sortBy: 'joiningDate',
     *   sortOrder: 'desc'
     * });
     */
    static async getUsers(filters: IUserFilters = {}): Promise<IPaginatedUsers> {
        const {
            // Search
            search,

            // Basic filters
            id,
            email,
            role,
            designation,
            active,

            // Date filters
            joiningDateFrom,
            joiningDateTo,

            // Pagination
            page = 1,
            limit = 10,

            // Sorting
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = filters;

        // Build where clause
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whereClause: Record<string, any> = {};

        // ID filter (for single user lookup)
        if (id) {
            whereClause.id = id;
        }

        // Email filter (for single user lookup)
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

        // Role filter
        if (role) {
            const roles = Array.isArray(role) ? role : [role];
            whereClause.role = { in: roles };
        }

        // Designation filter
        if (designation) {
            whereClause.designation = designation;
        }

        // Active status filter
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

        // Execute queries
        const [users, total] = await Promise.all([
            prisma.user.findMany({
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
            prisma.user.count({ where: whereClause })
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

    // Convenience methods using the main getUsers method
    static async findByEmail(email: string) {
        const result = await this.getUsers({ email, limit: 1 });
        return result.data[0] || null;
    }

    static async findById(id: string) {
        const result = await this.getUsers({ id, limit: 1 });
        return result.data[0] || null;
    }

    static async findActiveUsers(limit = 50) {
        const result = await this.getUsers({
            active: true,
            limit,
            sortBy: 'name',
            sortOrder: 'asc'
        });
        return result.data;
    }

    static async findByRole(role: string | string[], limit = 50) {
        const result = await this.getUsers({
            role,
            active: true,
            limit,
            sortBy: 'name',
            sortOrder: 'asc'
        });
        return result.data;
    }

    // User management actions (replacing your instance methods)
    static async changePassword(userId: string, newPassword: string): Promise<void> {
        const hashedPassword = await this.hashPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
    }

    static async deactivateUser(userId: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await prisma.$transaction(async (tx: any) => {
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

    static async activateUser(userId: string) {
        return await prisma.user.update({
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

    static async updateDesignation(userId: string, designation: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: { designation }
        });
    }

    static async updateProfile(userId: string, data: IUpdateProfileInput) {
        return await prisma.user.update({
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
                updatedAt: true
            }
        });
    }

    // Statistics (replacing your getUserStats static)
    static async getUserStats() {
        const [roleStats, statusStats, totalUsers] = await Promise.all([
            prisma.user.groupBy({
                by: ['role'],
                _count: { id: true },
                orderBy: { role: 'asc' }
            }),
            prisma.user.groupBy({
                by: ['active'],
                _count: { id: true }
            }),
            prisma.user.count()
        ]);

        return {
            roleStats,
            statusStats,
            totalUsers
        };
    }

    // Project-related queries (following your entity structure)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async findUsersByProject(_projectId: string) {
        const result = await this.getUsers({
            active: true,
            limit: 100,
            sortBy: 'name',
            sortOrder: 'asc'
        });
        // Note: Add project filtering when you have projectMembers relation
        return result.users;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async findUsersByTeam(_teamId: string) {
        const result = await this.getUsers({
            active: true,
            limit: 100,
            sortBy: 'name',
            sortOrder: 'asc'
        });
        // Note: Add team filtering when you have teamMembers relation
        return result.users;
    }

    // Get available staff (not assigned to teams)
    static async findAvailableStaff() {
        const result = await this.getUsers({
            active: true,
            limit: 100,
            sortBy: 'name',
            sortOrder: 'asc'
        });
        // Note: Add team filtering when you have team relations
        return result.users;
    }

    // Authentication helpers
    static async authenticateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({
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
        const token = this.generateToken(user.id);

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
