import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from './interface';

// Apply static methods to the schema
export function applyStaticMethods(schema: Schema<IUser>): void {

    // Find user by email
    schema.statics.findByEmail = function (email: string) {
        return this.findOne({ email: email.toLowerCase() });
    };

    // Find active users
    schema.statics.findActiveUsers = function () {
        return this.find({ isActive: true });
    };

    // Find users by role
    schema.statics.findByRole = function (role: string) {
        return this.find({ role, isActive: true });
    };

    // Find users by designation
    schema.statics.findByDesignation = function (designation: mongoose.Types.ObjectId) {
        return this.find({ designation, isActive: true })
            .populate('designation', 'title level');
    };

    // Find staff by team - query through Team model
    schema.statics.findStaffByTeam = async function (teamId: mongoose.Types.ObjectId) {
        const Team = mongoose.model('Team');
        const team = await Team.findById(teamId).populate('members');
        return team?.members || [];
    };

    // Advanced search with filters
    schema.statics.searchUsers = function (filters: {
        search?: string;
        role?: string[];
        designation?: mongoose.Types.ObjectId;
        isActive?: boolean;
    }) {
        const query: Record<string, unknown> = {};

        // Text search
        if (filters.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: 'i' } },
                { email: { $regex: filters.search, $options: 'i' } },
                { employeeId: { $regex: filters.search, $options: 'i' } }
            ];
        }

        // Role filter
        if (filters.role && filters.role.length > 0) {
            query.role = { $in: filters.role };
        }

        // Designation filter
        if (filters.designation) {
            query.designation = filters.designation;
        }

        // Active status filter
        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive;
        }

        return this.find(query)
            .select('-password') // Exclude password from results
            .populate('designation', 'title level')
            .sort({ createdAt: -1 });
    };

    // Get user statistics
    schema.statics.getUserStats = function () {
        return this.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 },
                    activeCount: {
                        $sum: { $cond: ['$isActive', 1, 0] }
                    }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    };

    // Get staff statistics
    schema.statics.getStaffStats = function () {
        return this.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 },
                    avgJoiningYear: {
                        $avg: { $year: '$joiningDate' }
                    }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    };

    // Find users by projects (through assignees)
    schema.statics.findUsersByProject = function (projectId: string) {
        const Project = mongoose.model('Project');
        return Project.findById(projectId)
            .populate('assignees', 'name email avatar role isActive designation')
            .then((project: Record<string, unknown> | null) => (project as { assignees?: IUser[] })?.assignees || []);
    };

    // Find users by team
    schema.statics.findUsersByTeam = function (teamId: string) {
        const Team = mongoose.model('Team');
        return Team.findById(teamId)
            .populate('members', 'name email avatar role isActive designation')
            .then((team: Record<string, unknown> | null) => (team as { members?: IUser[] })?.members || []);
    };

    // Find available staff (not assigned to any teams or specific teams)
    schema.statics.findAvailableStaff = async function (excludeTeamIds?: mongoose.Types.ObjectId[]) {
        const Team = mongoose.model('Team');

        // Get all team members
        const teamQuery: Record<string, unknown> = { isActive: true };
        if (excludeTeamIds && excludeTeamIds.length > 0) {
            teamQuery._id = { $nin: excludeTeamIds };
        }

        const teams = await Team.find(teamQuery).select('members');
        const assignedUserIds = teams.reduce((acc: mongoose.Types.ObjectId[], team: Record<string, unknown>) => {
            if (team.members && Array.isArray(team.members) && team.members.length > 0) {
                acc.push(...team.members);
            }
            return acc;
        }, []);

        // Find users not in any teams
        return this.find({
            isActive: true,
            _id: { $nin: assignedUserIds }
        })
            .populate('designation', 'title level')
            .sort({ name: 1 });
    };
}
