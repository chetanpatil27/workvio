import { Schema } from 'mongoose';
import { IProject, IProjectModel } from './interface';

// Apply static methods to the schema
export function applyStaticMethods(schema: Schema<IProject>): void {

    // Find project by key
    schema.statics.findByKey = function (key: string) {
        return this.findOne({ key: key.toUpperCase() });
    };

    // Find projects by lead
    schema.statics.findByLead = function (leadId: string) {
        return this.find({ leadId, status: { $ne: 'archived' } });
    };

    // Find projects by status
    schema.statics.findByStatus = function (status: string) {
        return this.find({ status });
    };

    // Find projects by priority
    schema.statics.findByPriority = function (priority: string) {
        return this.find({ priority, status: { $ne: 'archived' } });
    };

    // Find active projects
    schema.statics.findActiveProjects = function () {
        return this.find({
            status: { $in: ['active', 'planning', 'inprogress'] }
        }).sort({ updatedAt: -1 });
    };

    // Find projects by member (assignee)
    schema.statics.findProjectsByMember = function (userId: string) {
        return this.find({
            assignees: userId,
            status: { $ne: 'archived' }
        }).sort({ updatedAt: -1 });
    };

    // Find projects by team
    schema.statics.findProjectsByTeam = function (teamId: string) {
        return this.find({
            teams: teamId,
            status: { $ne: 'archived' }
        }).sort({ updatedAt: -1 });
    };

    // Find projects by sprint
    schema.statics.findProjectsBySprint = function (sprintId: string) {
        return this.find({
            sprints: sprintId,
            status: { $ne: 'archived' }
        }).sort({ updatedAt: -1 });
    };

    // Advanced search with filters
    schema.statics.searchProjects = function (filters: {
        search?: string;
        status?: string[];
        priority?: string[];
        leadId?: string;
        teamId?: string;
        assigneeId?: string;
        startDate?: Date;
        endDate?: Date;
    }) {
        const query: any = {};

        // Text search
        if (filters.search) {
            query.$text = { $search: filters.search };
        }

        // Status filter
        if (filters.status && filters.status.length > 0) {
            query.status = { $in: filters.status };
        }

        // Priority filter
        if (filters.priority && filters.priority.length > 0) {
            query.priority = { $in: filters.priority };
        }

        // Lead filter
        if (filters.leadId) {
            query.leadId = filters.leadId;
        }

        // Team filter
        if (filters.teamId) {
            query.teams = filters.teamId;
        }

        // Assignee filter
        if (filters.assigneeId) {
            query.assignees = filters.assigneeId;
        }

        // Date range filter
        if (filters.startDate || filters.endDate) {
            query.createdAt = {};
            if (filters.startDate) {
                query.createdAt.$gte = filters.startDate;
            }
            if (filters.endDate) {
                query.createdAt.$lte = filters.endDate;
            }
        }

        return this.find(query)
            .populate('leadId', 'name email avatar')
            .populate('teams', 'name')
            .populate('assignees', 'name email avatar')
            .sort({ updatedAt: -1 });
    };

    // Get project statistics
    schema.statics.getProjectStats = function () {
        return this.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    avgProgress: { $avg: '$progress' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    };
}
