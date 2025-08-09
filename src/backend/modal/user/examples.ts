// Example usage of the new modular User model

import mongoose from 'mongoose';
import User, { IUser } from './index';

// Usage examples:

// 1. Create a new user
export async function createUser(userData: Partial<IUser>) {
    const user = new User(userData);
    await user.save();
    return user;
}

// 2. Authenticate user
export async function authenticateUser(email: string, password: string) {
    // Find user with password field included
    const user = await User.findByEmail(email).select('+password').exec();
    if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return user;
}

// 3. Change user password
export async function changeUserPassword(userId: string, newPassword: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    await user.changePassword(newPassword);
    return user;
}

// 4. Search users with filters
export async function searchUsers(searchTerm: string, role?: string) {
    return await User.searchUsers({
        search: searchTerm,
        role: role ? [role] : undefined,
        isActive: true
    });
}

// 5. Get user dashboard data
export async function getUserDashboardData() {
    const stats = await User.getUserStats();
    const activeUsers = await User.findActiveUsers();

    return {
        stats,
        activeUsers: activeUsers.slice(0, 10) // Top 10 recent
    };
}

// 6. Manage user status
export async function deactivateUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    await user.deactivate();
    return user;
}

export async function activateUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    await user.activate();
    return user;
}

// 7. Get users by project or team
export async function getUsersByProject(projectId: string) {
    return await User.findUsersByProject(projectId);
}

export async function getUsersByTeam(teamId: string) {
    return await User.findUsersByTeam(teamId);
}
