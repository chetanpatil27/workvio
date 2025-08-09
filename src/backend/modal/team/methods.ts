import mongoose, { Schema } from 'mongoose';
import { ITeam } from './interface';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema<ITeam>): void {

    // Instance method to add member
    schema.methods.addMember = function (userId: mongoose.Types.ObjectId): void {
        if (!this.members) {
            this.members = [];
        }

        // Check if member already exists
        const exists = this.members.some((id: mongoose.Types.ObjectId) =>
            id.toString() === userId.toString()
        );

        if (!exists) {
            this.members.push(userId);
        }
    };

    // Instance method to remove member
    schema.methods.removeMember = function (userId: mongoose.Types.ObjectId): void {
        if (this.members) {
            this.members = this.members.filter((id: mongoose.Types.ObjectId) =>
                id.toString() !== userId.toString()
            );
        }
    };

    // Instance method to set team lead
    schema.methods.setLead = function (userId: mongoose.Types.ObjectId): void {
        this.leadId = userId;

        // Ensure lead is also a member
        if (!this.members) {
            this.members = [];
        }

        const isAlreadyMember = this.members.some((id: mongoose.Types.ObjectId) =>
            id.toString() === userId.toString()
        );

        if (!isAlreadyMember) {
            this.addMember(userId);
        }
    };

    // Instance method to activate team
    schema.methods.activate = async function (): Promise<void> {
        this.isActive = true;
        await this.save();
    };

    // Instance method to deactivate team
    schema.methods.deactivate = async function (): Promise<void> {
        this.isActive = false;
        await this.save();

        // Remove team from projects
        const Project = this.model('Project');
        await Project.updateMany(
            { teams: this._id },
            { $pull: { teams: this._id } }
        );
    };

    // Override toJSON to format data for frontend
    schema.methods.toJSON = function () {
        const teamObject = this.toObject();

        // Transform _id to id for frontend compatibility
        teamObject.id = teamObject._id.toString();
        delete teamObject._id;

        // Convert ObjectIds to strings
        if (teamObject.leadId) {
            teamObject.leadId = teamObject.leadId.toString();
        }

        if (teamObject.members) {
            teamObject.members = teamObject.members.map((id: mongoose.Types.ObjectId) => id.toString());
        }

        // Format dates as ISO strings
        teamObject.createdAt = teamObject.createdAt.toISOString();
        teamObject.updatedAt = teamObject.updatedAt.toISOString();

        return teamObject;
    };
}
