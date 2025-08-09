import mongoose, { Schema } from 'mongoose';
import { IProject } from './interface';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema<IProject>): void {

    // Instance method to add team
    schema.methods.addTeam = function (teamId: mongoose.Types.ObjectId): void {
        if (!this.teams) {
            this.teams = [];
        }

        // Check if team already exists
        const exists = this.teams.some((id: mongoose.Types.ObjectId) => id.toString() === teamId.toString());

        if (!exists) {
            this.teams.push(teamId);
        }
    };

    // Instance method to remove team
    schema.methods.removeTeam = function (teamId: mongoose.Types.ObjectId): void {
        if (this.teams) {
            this.teams = this.teams.filter((id: mongoose.Types.ObjectId) => id.toString() !== teamId.toString());
        }
    };

    // Instance method to add assignee
    schema.methods.addAssignee = function (userId: mongoose.Types.ObjectId): void {
        if (!this.assignees) {
            this.assignees = [];
        }

        // Check if assignee already exists
        const exists = this.assignees.some((id: mongoose.Types.ObjectId) => id.toString() === userId.toString());

        if (!exists) {
            this.assignees.push(userId);
        }
    };

    // Instance method to remove assignee
    schema.methods.removeAssignee = function (userId: mongoose.Types.ObjectId): void {
        if (this.assignees) {
            this.assignees = this.assignees.filter((id: mongoose.Types.ObjectId) => id.toString() !== userId.toString());
        }
    };

    // Instance method to add sprint
    schema.methods.addSprint = function (sprintId: mongoose.Types.ObjectId): void {
        if (!this.sprints) {
            this.sprints = [];
        }

        // Check if sprint already exists
        const exists = this.sprints.some((id: mongoose.Types.ObjectId) => id.toString() === sprintId.toString());

        if (!exists) {
            this.sprints.push(sprintId);
        }
    };

    // Instance method to remove sprint
    schema.methods.removeSprint = function (sprintId: mongoose.Types.ObjectId): void {
        if (this.sprints) {
            this.sprints = this.sprints.filter((id: mongoose.Types.ObjectId) => id.toString() !== sprintId.toString());
        }
    };

    // Override toJSON to format data for frontend
    schema.methods.toJSON = function () {
        const projectObject = this.toObject();

        // Transform _id to id for frontend compatibility
        projectObject.id = projectObject._id.toString();
        delete projectObject._id;

        // Convert ObjectIds to strings
        if (projectObject.leadId) {
            projectObject.leadId = projectObject.leadId.toString();
        }

        if (projectObject.teams) {
            projectObject.teams = projectObject.teams.map((id: mongoose.Types.ObjectId) => id.toString());
        }

        if (projectObject.assignees) {
            projectObject.assignees = projectObject.assignees.map((id: mongoose.Types.ObjectId) => id.toString());
        }

        if (projectObject.sprints) {
            projectObject.sprints = projectObject.sprints.map((id: mongoose.Types.ObjectId) => id.toString());
        }

        // Format dates as ISO strings
        if (projectObject.dueDate) {
            projectObject.dueDate = projectObject.dueDate.toISOString();
        }

        if (projectObject.startDate) {
            projectObject.startDate = projectObject.startDate.toISOString();
        }

        projectObject.createdAt = projectObject.createdAt.toISOString();
        projectObject.updatedAt = projectObject.updatedAt.toISOString();

        return projectObject;
    };
}
