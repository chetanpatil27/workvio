import mongoose, { Document } from 'mongoose';

// Team interface
export interface ITeam extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    leadId?: mongoose.Types.ObjectId; // Reference to User
    members?: mongoose.Types.ObjectId[]; // Array of user IDs
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    addMember(userId: mongoose.Types.ObjectId): void;
    removeMember(userId: mongoose.Types.ObjectId): void;
    setLead(userId: mongoose.Types.ObjectId): void;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
    toJSON(): Record<string, unknown>;
}

// Static methods interface
export interface ITeamModel extends mongoose.Model<ITeam> {
    findByLead(leadId: string): Promise<ITeam[]>;
    findByMember(userId: string): Promise<ITeam[]>;
    findActive(): Promise<ITeam[]>;
    searchTeams(filters: {
        search?: string;
        leadId?: string;
        isActive?: boolean;
    }): Promise<ITeam[]>;
    getTeamStats(): Promise<Record<string, unknown>[]>;
}
