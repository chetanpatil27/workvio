import mongoose from 'mongoose';
import { ISprint, ISprintModel } from './interface';

// Static methods for Sprint model
export async function findByProject(this: ISprintModel, project: mongoose.Types.ObjectId): Promise<ISprint[]> {
    return this.find({ project, isActive: true })
        .sort({ startDate: -1 })
        .populate('project', 'name')
        .exec();
}

export async function findByStatus(this: ISprintModel, status: string): Promise<ISprint[]> {
    return this.find({ status, isActive: true })
        .sort({ startDate: -1 })
        .populate('project', 'name')
        .exec();
}

export async function findByTicket(this: ISprintModel, ticketId: mongoose.Types.ObjectId): Promise<ISprint | null> {
    return this.findOne({ tickets: ticketId, isActive: true })
        .populate('project', 'name')
        .populate('tickets', 'title status type priority')
        .exec();
}

export async function findActive(this: ISprintModel): Promise<ISprint[]> {
    const now = new Date();
    return this.find({
        status: 'active',
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now }
    })
        .sort({ startDate: -1 })
        .populate('project', 'name')
        .exec();
}

export async function findCurrent(this: ISprintModel): Promise<ISprint[]> {
    const now = new Date();
    return this.find({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now }
    })
        .sort({ startDate: -1 })
        .populate('project', 'name')
        .exec();
}

export async function findUpcoming(this: ISprintModel): Promise<ISprint[]> {
    const now = new Date();
    return this.find({
        isActive: true,
        startDate: { $gt: now }
    })
        .sort({ startDate: 1 })
        .populate('project', 'name')
        .exec();
}

export async function searchSprints(this: ISprintModel, filters: {
    search?: string;
    project?: mongoose.Types.ObjectId;
    status?: string[];
    isActive?: boolean;
    dateRange?: {
        start: Date;
        end: Date;
    };
}): Promise<ISprint[]> {
    const query: Record<string, unknown> = {};

    // Text search
    if (filters.search) {
        query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } }
        ];
    }

    // Project filter
    if (filters.project) {
        query.project = filters.project;
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
        query.status = { $in: filters.status };
    }

    // Active filter
    if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
    }

    // Date range filter
    if (filters.dateRange) {
        query.$or = [
            {
                startDate: {
                    $gte: filters.dateRange.start,
                    $lte: filters.dateRange.end
                }
            },
            {
                endDate: {
                    $gte: filters.dateRange.start,
                    $lte: filters.dateRange.end
                }
            },
            {
                $and: [
                    { startDate: { $lte: filters.dateRange.start } },
                    { endDate: { $gte: filters.dateRange.end } }
                ]
            }
        ];
    }

    return this.find(query)
        .sort({ startDate: -1 })
        .populate('project', 'name')
        .exec();
}

export async function getSprintStats(this: ISprintModel, project?: mongoose.Types.ObjectId): Promise<Record<string, unknown>> {
    const matchQuery: Record<string, unknown> = { isActive: true };

    if (project) {
        matchQuery.project = project;
    }

    const stats = await this.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalGoals: { $sum: { $size: { $ifNull: ['$goals', []] } } }
            }
        }
    ]);

    const now = new Date();
    const currentSprints = await this.countDocuments({
        ...matchQuery,
        startDate: { $lte: now },
        endDate: { $gte: now }
    });

    const overdueSprints = await this.countDocuments({
        ...matchQuery,
        endDate: { $lt: now },
        status: { $nin: ['completed', 'cancelled'] }
    });

    const result: Record<string, unknown> = {
        byStatus: {},
        currentSprints,
        overdueSprints,
        totalSprints: 0,
        totalGoals: 0
    };

    let totalSprints = 0;
    let totalGoals = 0;

    stats.forEach((stat) => {
        (result.byStatus as Record<string, unknown>)[stat._id] = {
            count: stat.count,
            goals: stat.totalGoals
        };
        totalSprints += stat.count;
        totalGoals += stat.totalGoals;
    });

    result.totalSprints = totalSprints;
    result.totalGoals = totalGoals;

    return result;
}
