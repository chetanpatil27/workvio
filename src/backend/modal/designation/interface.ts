import mongoose, { Document } from 'mongoose';

// Designation interface
export interface IDesignation extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    level: 'junior' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    activate(): Promise<void>;
    deactivate(): Promise<void>;
    toJSON(): Record<string, unknown>;
}

// Static methods interface
export interface IDesignationModel extends mongoose.Model<IDesignation> {
    findByLevel(level: string): Promise<IDesignation[]>;
    findActive(): Promise<IDesignation[]>;
    searchDesignations(filters: {
        search?: string;
        level?: string[];
        isActive?: boolean;
    }): Promise<IDesignation[]>;
}
