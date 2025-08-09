import mongoose, { Document } from 'mongoose';

// User interface matching the frontend User type
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    name: string;
    password: string;
    avatar?: string;
    role: 'admin' | 'manager' | 'developer' | 'tester';
    isActive: boolean;

    // Staff-related fields
    designation?: mongoose.Types.ObjectId;
    employeeId?: string;
    joiningDate?: Date;
    phone?: string;
    address?: string;

    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    comparePassword(candidatePassword: string): Promise<boolean>;
    changePassword(newPassword: string): Promise<void>;
    deactivate(): Promise<void>;
    activate(): Promise<void>;
    updateDesignation(designation: mongoose.Types.ObjectId): Promise<void>;
    toJSON(): Record<string, unknown>;
}

// Static methods interface
export interface IUserModel extends mongoose.Model<IUser> {
    findByEmail(email: string): mongoose.Query<IUser | null, IUser>;
    findActiveUsers(): Promise<IUser[]>;
    findByRole(role: string): Promise<IUser[]>;
    findByDesignation(designation: mongoose.Types.ObjectId): Promise<IUser[]>;
    findStaffByTeam(teamId: mongoose.Types.ObjectId): Promise<IUser[]>;
    searchUsers(filters: {
        search?: string;
        role?: string[];
        designation?: mongoose.Types.ObjectId;
        isActive?: boolean;
    }): Promise<IUser[]>;
    getUserStats(): Promise<Record<string, unknown>[]>;
    getStaffStats(): Promise<Record<string, unknown>>;
    findUsersByProject(projectId: string): Promise<IUser[]>;
    findUsersByTeam(teamId: string): Promise<IUser[]>;
    findAvailableStaff(excludeTeamIds?: mongoose.Types.ObjectId[]): Promise<IUser[]>;
}
