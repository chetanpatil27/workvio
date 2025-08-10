import { prisma } from '@/backend/prisma';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export interface ICreateUserInput {
    email: string;
    name: string;
    password: string;
    role?: 'admin' | 'manager' | 'developer' | 'tester';
    designationId?: string;
    employeeId?: string;
    phone?: string;
    address?: string;
    joiningDate?: Date;
}

export interface IUserSearchFilters {
    search?: string;
    role?: string[];
    designation?: string;
    isActive?: boolean;
}

export interface IUpdateProfileInput {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

export class UserService {
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

        return await prisma.user.create({
            data: {
                email: data.email.toLowerCase().trim(),
                name: data.name.trim(),
                password: hashedPassword,
                role: data.role || 'developer',
                designationId: data.designationId,
                employeeId: data.employeeId,
                phone: data.phone,
                address: data.address,
                joiningDate: data.joiningDate,
                isActive: true
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                isActive: true,
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

    static async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            include: { designation: true }
        });
    }

    static async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                isActive: true,
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

    static async findActiveUsers() {
        return await prisma.user.findMany({
            where: { isActive: true },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                designation: true,
                employeeId: true
            },
            orderBy: { name: 'asc' }
        });
    }

    static async findByRole(role: string | string[]) {
        const roles = Array.isArray(role) ? role : [role];

        return await prisma.user.findMany({
            where: {
                role: { in: roles },
                isActive: true
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                designation: true
            },
            orderBy: { name: 'asc' }
        });
    }

    static async findByDesignation(designationId: string) {
        return await prisma.user.findMany({
            where: {
                designationId,
                isActive: true
            },
            include: { designation: true },
            orderBy: { name: 'asc' }
        });
    }

    // Advanced search (replacing your searchUsers static)
    static async searchUsers(filters: IUserSearchFilters) {
        return await prisma.user.findMany({
            where: {
                ...(filters.search && {
                    OR: [
                        { name: { contains: filters.search, mode: 'insensitive' } },
                        { email: { contains: filters.search, mode: 'insensitive' } },
                        { employeeId: { contains: filters.search, mode: 'insensitive' } }
                    ]
                }),
                ...(filters.role && { role: { in: filters.role } }),
                ...(filters.designation && { designationId: filters.designation }),
                ...(filters.isActive !== undefined && { isActive: filters.isActive })
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                isActive: true,
                designation: true,
                employeeId: true,
                phone: true,
                joiningDate: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
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
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Deactivate user
            const user = await tx.user.update({
                where: { id: userId },
                data: { isActive: false }
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
            data: { isActive: true },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                designation: true
            }
        });
    }

    static async updateDesignation(userId: string, designationId: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: { designationId },
            include: { designation: true }
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
                by: ['isActive'],
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
        return await prisma.user.findMany({
            where: {
                // Note: Uncomment when you have projectMembers relation
                // projectMembers: {
                //   some: { projectId }
                // },
                isActive: true
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                designation: true
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async findUsersByTeam(_teamId: string) {
        return await prisma.user.findMany({
            where: {
                // Note: Uncomment when you have teamMembers relation
                // teamMembers: {
                //   some: { teamId }
                // },
                isActive: true
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                designation: true
            }
        });
    }

    // Authentication helpers
    static async authenticateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase().trim(),
                isActive: true
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
            throw new Error('Invalid password');
        }

        // Return user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Utility method for safe user data (replacing your toJSON override)
    static sanitizeUser(user: Record<string, unknown> | null) {
        if (!user) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }

    // Get available staff (not assigned to teams)
    static async findAvailableStaff() {
        return await prisma.user.findMany({
            where: {
                isActive: true,
                // Note: Add team filtering when you have team relations
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                designation: true,
                employeeId: true
            },
            orderBy: { name: 'asc' }
        });
    }
}
