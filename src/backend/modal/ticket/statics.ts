import mongoose, { Schema } from 'mongoose';
import { ITicket } from './interface';

// Apply static methods to the schema
export function applyStaticMethods(schema: Schema): void {
    // Find tickets by team
    schema.statics.findByTeam = function (team: mongoose.Types.ObjectId) {
        return this.find({ teams: team, isActive: true })
            .sort({ priority: -1, createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find tickets by sprint
    schema.statics.findBySprint = function (sprint: mongoose.Types.ObjectId) {
        return this.find({ sprint, isActive: true })
            .sort({ priority: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find tickets by assignee
    schema.statics.findByAssignee = function (assignee: mongoose.Types.ObjectId) {
        return this.find({ assignee, isActive: true })
            .sort({ priority: -1, dueDate: 1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find tickets by reporter
    schema.statics.findByReporter = function (reporter: mongoose.Types.ObjectId) {
        return this.find({ reporter, isActive: true })
            .sort({ createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .exec();
    };

    // Find tickets by status
    schema.statics.findByStatus = function (status: mongoose.Types.ObjectId) {
        return this.find({ status, isActive: true })
            .sort({ priority: -1, createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find tickets by type
    schema.statics.findByType = function (type: string) {
        return this.find({ type, isActive: true })
            .sort({ priority: -1, createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find tickets by priority
    schema.statics.findByPriority = function (priority: string) {
        return this.find({ priority, isActive: true })
            .sort({ createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find overdue tickets
    schema.statics.findOverdue = function () {
        const now = new Date();
        return this.find({
            dueDate: { $lt: now },
            isActive: true
        })
            .sort({ dueDate: 1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Find unassigned tickets
    schema.statics.findUnassigned = function () {
        return this.find({
            assignee: { $exists: false },
            isActive: true
        })
            .sort({ priority: -1, createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('reporter', 'name email')
            .exec();
    };

    // Search tickets with filters
    schema.statics.searchTickets = function (filters: {
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
    }) {
        const query: Record<string, unknown> = {};

        // Text search
        if (filters.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: 'i' } },
                { description: { $regex: filters.search, $options: 'i' } }
            ];
        }

        // Teams filter
        if (filters.teams && filters.teams.length > 0) {
            query.teams = { $in: filters.teams };
        }

        // Sprint filter
        if (filters.sprint) {
            query.sprint = filters.sprint;
        }

        // Assignee filter
        if (filters.assignee) {
            query.assignee = filters.assignee;
        }

        // Reporter filter
        if (filters.reporter) {
            query.reporter = filters.reporter;
        }

        // Status filter
        if (filters.status && filters.status.length > 0) {
            query.status = { $in: filters.status };
        }

        // Type filter
        if (filters.type && filters.type.length > 0) {
            query.type = { $in: filters.type };
        }

        // Priority filter
        if (filters.priority && filters.priority.length > 0) {
            query.priority = { $in: filters.priority };
        }

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }

        // Active filter
        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive;
        }

        // Date range filter
        if (filters.dateRange) {
            query.createdAt = {
                $gte: filters.dateRange.start,
                $lte: filters.dateRange.end
            };
        }

        return this.find(query)
            .sort({ priority: -1, createdAt: -1 })
            .populate('teams', 'name')
            .populate('sprint', 'name status')
            .populate('status', 'name color')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();
    };

    // Get ticket statistics
    schema.statics.getTicketStats = async function (team?: mongoose.Types.ObjectId) {
        const matchQuery: Record<string, unknown> = { isActive: true };

        if (team) {
            matchQuery.teams = team;
        }

        const stats = await this.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: {
                        status: '$status',
                        type: '$type',
                        priority: '$priority'
                    },
                    count: { $sum: 1 },
                    totalEstimated: { $sum: { $ifNull: ['$estimatedHours', 0] } },
                    totalActual: { $sum: { $ifNull: ['$actualHours', 0] } }
                }
            }
        ]);

        const now = new Date();
        const overdueCount = await this.countDocuments({
            ...matchQuery,
            dueDate: { $lt: now }
        });

        const unassignedCount = await this.countDocuments({
            ...matchQuery,
            assignee: { $exists: false }
        });

        const result: Record<string, unknown> = {
            byStatus: {},
            byType: {},
            byPriority: {},
            overdueCount,
            unassignedCount,
            totalTickets: 0,
            totalEstimatedHours: 0,
            totalActualHours: 0
        };

        let totalTickets = 0;
        let totalEstimatedHours = 0;
        let totalActualHours = 0;

        stats.forEach((stat) => {
            const { status, type, priority } = stat._id;

            // By status
            if (!(result.byStatus as Record<string, unknown>)[status]) {
                (result.byStatus as Record<string, unknown>)[status] = { count: 0, estimated: 0, actual: 0 };
            }
            const statusData = (result.byStatus as Record<string, unknown>)[status] as Record<string, number>;
            statusData.count += stat.count;
            statusData.estimated += stat.totalEstimated;
            statusData.actual += stat.totalActual;

            // By type
            if (!(result.byType as Record<string, unknown>)[type]) {
                (result.byType as Record<string, unknown>)[type] = { count: 0, estimated: 0, actual: 0 };
            }
            const typeData = (result.byType as Record<string, unknown>)[type] as Record<string, number>;
            typeData.count += stat.count;
            typeData.estimated += stat.totalEstimated;
            typeData.actual += stat.totalActual;

            // By priority
            if (!(result.byPriority as Record<string, unknown>)[priority]) {
                (result.byPriority as Record<string, unknown>)[priority] = { count: 0, estimated: 0, actual: 0 };
            }
            const priorityData = (result.byPriority as Record<string, unknown>)[priority] as Record<string, number>;
            priorityData.count += stat.count;
            priorityData.estimated += stat.totalEstimated;
            priorityData.actual += stat.totalActual;

            totalTickets += stat.count;
            totalEstimatedHours += stat.totalEstimated;
            totalActualHours += stat.totalActual;
        });

        result.totalTickets = totalTickets;
        result.totalEstimatedHours = totalEstimatedHours;
        result.totalActualHours = totalActualHours;

        return result;
    };

    // Get kanban board data
    schema.statics.getKanbanBoard = async function (team: mongoose.Types.ObjectId, sprint?: mongoose.Types.ObjectId) {
        const matchQuery: Record<string, unknown> = {
            teams: team,
            isActive: true
        };

        if (sprint) {
            matchQuery.sprint = sprint;
        }

        const tickets = await this.find(matchQuery)
            .sort({ priority: -1, createdAt: -1 })
            .populate('status', 'name')
            .populate('assignee', 'name email')
            .populate('reporter', 'name email')
            .exec();

        const kanbanBoard: Record<string, ITicket[]> = {};

        tickets.forEach((ticket: ITicket) => {
            // Since status is now populated, we can use the status name
            const statusName = (ticket.status as any)?.name || 'unknown';
            if (!kanbanBoard[statusName]) {
                kanbanBoard[statusName] = [];
            }
            kanbanBoard[statusName].push(ticket);
        });

        return kanbanBoard;
    };
}
