import mongoose, { Document } from 'mongoose';

// Ticket interface
export interface ITicket extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    type: 'Task' | 'Bug' | 'Story';
    status: mongoose.Types.ObjectId; // Reference to Status
    priority: 'High' | 'Medium' | 'Low';
    teams?: mongoose.Types.ObjectId[]; // References to Teams
    sprint?: mongoose.Types.ObjectId; // Reference to Sprint
    assignee?: mongoose.Types.ObjectId; // Reference to User
    reporter: mongoose.Types.ObjectId; // Reference to User who created the ticket
    estimatedHours?: number;
    actualHours?: number;
    dueDate?: Date;
    tags?: string[];
    attachments?: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    assignTo(userId: mongoose.Types.ObjectId): Promise<ITicket>;
    unassign(): Promise<ITicket>;
    changeStatus(statusId: mongoose.Types.ObjectId): Promise<ITicket>;
    changePriority(newPriority: string): Promise<ITicket>;
    addTeam(teamId: mongoose.Types.ObjectId): Promise<ITicket>;
    removeTeam(teamId: mongoose.Types.ObjectId): Promise<ITicket>;
    addTag(tag: string): Promise<ITicket>;
    removeTag(tag: string): Promise<ITicket>;
    addAttachment(filePath: string): Promise<ITicket>;
    removeAttachment(filePath: string): Promise<ITicket>;
    updateEstimate(hours: number): Promise<ITicket>;
    logTime(hours: number): Promise<ITicket>;
    activate(): Promise<ITicket>;
    deactivate(): Promise<ITicket>;
    isOverdue(): boolean;
    getProgress(): number;
    toJSON(): Record<string, unknown>;
}

// Static methods interface
export interface ITicketModel extends mongoose.Model<ITicket> {
    findByTeam(team: mongoose.Types.ObjectId): Promise<ITicket[]>;
    findBySprint(sprint: mongoose.Types.ObjectId): Promise<ITicket[]>;
    findByAssignee(assignee: mongoose.Types.ObjectId): Promise<ITicket[]>;
    findByReporter(reporter: mongoose.Types.ObjectId): Promise<ITicket[]>;
    findByStatus(status: mongoose.Types.ObjectId): Promise<ITicket[]>;
    findByType(type: string): Promise<ITicket[]>;
    findByPriority(priority: string): Promise<ITicket[]>;
    findOverdue(): Promise<ITicket[]>;
    findUnassigned(): Promise<ITicket[]>;
    searchTickets(filters: {
        search?: string;
        teams?: mongoose.Types.ObjectId[];
        sprint?: mongoose.Types.ObjectId;
        assignee?: mongoose.Types.ObjectId;
        reporter?: mongoose.Types.ObjectId;
        status?: mongoose.Types.ObjectId[];
        type?: string[];
        priority?: string[];
        tags?: string[];
        isActive?: boolean;
        dateRange?: {
            start: Date;
            end: Date;
        };
    }): Promise<ITicket[]>;
    getTicketStats(team?: mongoose.Types.ObjectId): Promise<Record<string, unknown>>;
    getKanbanBoard(team: mongoose.Types.ObjectId, sprint?: mongoose.Types.ObjectId): Promise<Record<string, ITicket[]>>;
}
