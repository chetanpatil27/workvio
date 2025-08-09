import mongoose, { Document } from 'mongoose';

// Sprint interface
export interface ISprint extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    project: mongoose.Types.ObjectId; // Reference to Project
    startDate: Date;
    endDate: Date;
    status: 'planning' | 'active' | 'completed' | 'cancelled';
    goals?: string[];
    tickets?: mongoose.Types.ObjectId[]; // References to Tickets
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    activate(): Promise<ISprint>;
    deactivate(): Promise<ISprint>;
    complete(): Promise<ISprint>;
    cancel(): Promise<ISprint>;
    addGoal(goal: string): Promise<ISprint>;
    removeGoal(goal: string): Promise<ISprint>;
    updateGoal(oldGoal: string, newGoal: string): Promise<ISprint>;
    addTicket(ticketId: mongoose.Types.ObjectId): Promise<ISprint>;
    removeTicket(ticketId: mongoose.Types.ObjectId): Promise<ISprint>;
    isInProgress(): boolean;
    isCompleted(): boolean;
    isCancelled(): boolean;
    getDuration(): number;
    getRemainingDays(): number;
    getProgress(): number;
    toJSON(): Record<string, unknown>;
}

// Static methods interface
export interface ISprintModel extends mongoose.Model<ISprint> {
    findByProject(project: mongoose.Types.ObjectId): Promise<ISprint[]>;
    findByStatus(status: string): Promise<ISprint[]>;
    findByTicket(ticketId: mongoose.Types.ObjectId): Promise<ISprint | null>;
    findActive(): Promise<ISprint[]>;
    findCurrent(): Promise<ISprint[]>;
    findUpcoming(): Promise<ISprint[]>;
    searchSprints(filters: {
        search?: string;
        project?: mongoose.Types.ObjectId;
        status?: string[];
        isActive?: boolean;
        dateRange?: {
            start: Date;
            end: Date;
        };
    }): Promise<ISprint[]>;
    getSprintStats(project?: mongoose.Types.ObjectId): Promise<Record<string, unknown>>;
}
