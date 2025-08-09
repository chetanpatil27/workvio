import mongoose, { Document } from 'mongoose';

// Project interface matching the frontend Project type
export interface IProject extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    key?: string; // Project key like 'PROJ'
    leadId?: mongoose.Types.ObjectId; // Reference to User
    status: 'active' | 'inactive' | 'archived' | 'completed' | 'on-hold' | 'planning' | 'inprogress' | 'onhold';
    progress?: number; // Progress percentage (0-100)
    dueDate?: Date;
    startDate?: Date;
    teams?: mongoose.Types.ObjectId[]; // Array of team IDs (references to Team)
    assignees?: mongoose.Types.ObjectId[]; // Array of user IDs (references to User)
    sprints?: mongoose.Types.ObjectId[]; // Array of sprint IDs (references to Sprint)
    client?: string; // Client name
    priority?: 'High' | 'Medium' | 'Low'; // Priority level
    color?: string; // Hex color for project identification
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    addTeam(teamId: mongoose.Types.ObjectId): void;
    removeTeam(teamId: mongoose.Types.ObjectId): void;
    addAssignee(userId: mongoose.Types.ObjectId): void;
    removeAssignee(userId: mongoose.Types.ObjectId): void;
    addSprint(sprintId: mongoose.Types.ObjectId): void;
    removeSprint(sprintId: mongoose.Types.ObjectId): void;
    toJSON(): any;
}

// Static methods interface
export interface IProjectModel extends mongoose.Model<IProject> {
    findByKey(key: string): Promise<IProject | null>;
    findByLead(leadId: string): Promise<IProject[]>;
    findByStatus(status: string): Promise<IProject[]>;
    findByPriority(priority: string): Promise<IProject[]>;
    findActiveProjects(): Promise<IProject[]>;
    findProjectsByMember(userId: string): Promise<IProject[]>;
    findProjectsByTeam(teamId: string): Promise<IProject[]>;
    findProjectsBySprint(sprintId: string): Promise<IProject[]>;
    searchProjects(filters: {
        search?: string;
        status?: string[];
        priority?: string[];
        leadId?: string;
        teamId?: string;
        assigneeId?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<IProject[]>;
    getProjectStats(): Promise<any[]>;
}
