import mongoose from 'mongoose';
import { ITeam, ITeamModel } from './interface';

// Apply static methods to the model
export function applyStaticMethods(schema: mongoose.Schema<ITeam, ITeamModel>): void {

    // Find team by name
    schema.statics.findByName = async function (name: string): Promise<ITeam | null> {
        return await this.findOne({ name }).exec();
    };

    // Find teams with member
    schema.statics.findTeamsWithMember = async function (userId: mongoose.Types.ObjectId): Promise<ITeam[]> {
        return await this.find({
            members: userId,
            isActive: true
        }).populate('leadId', 'name email').exec();
    };

    // Find teams led by user
    schema.statics.findTeamsLedBy = async function (userId: mongoose.Types.ObjectId): Promise<ITeam[]> {
        return await this.find({
            leadId: userId,
            isActive: true
        }).populate('members', 'name email').exec();
    };

    // Get all active teams
    schema.statics.findActiveTeams = async function (): Promise<ITeam[]> {
        return await this.find({ isActive: true })
            .populate('leadId', 'name email')
            .populate('members', 'name email')
            .sort({ name: 1 })
            .exec();
    };

    // Get team statistics
    schema.statics.getTeamStats = async function (teamId: mongoose.Types.ObjectId): Promise<any> {
        const team = await this.findById(teamId).populate('members').exec();

        if (!team) {
            throw new Error('Team not found');
        }

        // Get project count for this team
        const Project = mongoose.model('Project');
        const projectCount = await Project.countDocuments({ teams: teamId });

        return {
            memberCount: team.members?.length || 0,
            projectCount,
            isActive: team.isActive
        };
    };

    // Search teams by name or description
    schema.statics.searchTeams = async function (searchTerm: string, limit: number = 10): Promise<ITeam[]> {
        return await this.find({
            $and: [
                { isActive: true },
                {
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { description: { $regex: searchTerm, $options: 'i' } }
                    ]
                }
            ]
        })
            .populate('leadId', 'name email')
            .populate('members', 'name email')
            .limit(limit)
            .exec();
    };

    // Get teams with low member count (for optimization)
    schema.statics.findUnderutilizedTeams = async function (threshold: number = 3): Promise<ITeam[]> {
        const teams = await this.aggregate([
            {
                $match: {
                    isActive: true
                }
            },
            {
                $addFields: {
                    memberCount: {
                        $size: { $ifNull: ['$members', []] }
                    }
                }
            },
            {
                $match: {
                    memberCount: { $lt: threshold }
                }
            },
            {
                $sort: { memberCount: 1, createdAt: 1 }
            }
        ]);

        return teams;
    };
}
