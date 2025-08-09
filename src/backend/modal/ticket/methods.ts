import mongoose, { Schema } from 'mongoose';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema): void {
    // Assignment methods
    schema.methods.assignTo = function (userId: mongoose.Types.ObjectId) {
        if (!userId) {
            throw new Error('User ID is required');
        }

        this.assignee = userId;
        return this.save();
    };

    schema.methods.unassign = function () {
        this.assignee = undefined;
        return this.save();
    };

    // Status and priority methods
    schema.methods.changeStatus = function (statusId: mongoose.Types.ObjectId) {
        if (!statusId) {
            throw new Error('Status ID is required');
        }

        this.status = statusId;
        return this.save();
    };

    schema.methods.changePriority = function (newPriority: string) {
        const validPriorities = ['High', 'Medium', 'Low'];

        if (!validPriorities.includes(newPriority)) {
            throw new Error('Invalid priority');
        }

        this.priority = newPriority as 'High' | 'Medium' | 'Low';
        return this.save();
    };

    // Team management methods
    schema.methods.addTeam = function (teamId: mongoose.Types.ObjectId) {
        if (!teamId) {
            throw new Error('Team ID is required');
        }

        if (!this.teams) {
            this.teams = [];
        }

        if (this.teams.some((id: mongoose.Types.ObjectId) => id.toString() === teamId.toString())) {
            throw new Error('Team already added to ticket');
        }

        this.teams.push(teamId);
        return this.save();
    };

    schema.methods.removeTeam = function (teamId: mongoose.Types.ObjectId) {
        if (!this.teams || this.teams.length === 0) {
            throw new Error('No teams to remove');
        }

        const teamIndex = this.teams.findIndex((id: mongoose.Types.ObjectId) => id.toString() === teamId.toString());
        if (teamIndex === -1) {
            throw new Error('Team not found in ticket');
        }

        this.teams.splice(teamIndex, 1);
        return this.save();
    };

    // Tag management methods
    schema.methods.addTag = function (tag: string) {
        if (!tag || tag.trim().length === 0) {
            throw new Error('Tag cannot be empty');
        }

        if (tag.length > 50) {
            throw new Error('Tag cannot exceed 50 characters');
        }

        if (!this.tags) {
            this.tags = [];
        }

        const cleanTag = tag.trim().toLowerCase();
        if (this.tags.map((t: string) => t.toLowerCase()).includes(cleanTag)) {
            throw new Error('Tag already exists');
        }

        this.tags.push(tag.trim());
        return this.save();
    };

    schema.methods.removeTag = function (tag: string) {
        if (!this.tags || this.tags.length === 0) {
            throw new Error('No tags to remove');
        }

        const tagIndex = this.tags.findIndex((t: string) => t.toLowerCase() === tag.toLowerCase());
        if (tagIndex === -1) {
            throw new Error('Tag not found');
        }

        this.tags.splice(tagIndex, 1);
        return this.save();
    };

    // Attachment management methods
    schema.methods.addAttachment = function (filePath: string) {
        if (!filePath || filePath.trim().length === 0) {
            throw new Error('File path is required');
        }

        if (!this.attachments) {
            this.attachments = [];
        }

        if (this.attachments.includes(filePath.trim())) {
            throw new Error('Attachment already exists');
        }

        this.attachments.push(filePath.trim());
        return this.save();
    };

    schema.methods.removeAttachment = function (filePath: string) {
        if (!this.attachments || this.attachments.length === 0) {
            throw new Error('No attachments to remove');
        }

        const attachmentIndex = this.attachments.indexOf(filePath);
        if (attachmentIndex === -1) {
            throw new Error('Attachment not found');
        }

        this.attachments.splice(attachmentIndex, 1);
        return this.save();
    };

    // Time tracking methods
    schema.methods.updateEstimate = function (hours: number) {
        if (hours < 0) {
            throw new Error('Estimated hours cannot be negative');
        }

        if (hours > 1000) {
            throw new Error('Estimated hours cannot exceed 1000');
        }

        this.estimatedHours = hours;
        return this.save();
    };

    schema.methods.logTime = function (hours: number) {
        if (hours < 0) {
            throw new Error('Hours cannot be negative');
        }

        if (!this.actualHours) {
            this.actualHours = 0;
        }

        this.actualHours += hours;
        return this.save();
    };

    // Status control methods
    schema.methods.activate = function () {
        this.isActive = true;
        return this.save();
    };

    schema.methods.deactivate = function () {
        this.isActive = false;
        return this.save();
    };

    // Utility methods
    schema.methods.isOverdue = function () {
        if (!this.dueDate) {
            return false;
        }

        return new Date() > this.dueDate;
    };

    schema.methods.getProgress = function () {
        // Since status is now a reference to Status model,
        // we would need to populate it to get the actual status value
        // For now, return a default progress based on creation date
        const daysSinceCreation = Math.floor((new Date().getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));

        // Simple progress calculation - can be enhanced based on status
        if (daysSinceCreation === 0) return 10;
        if (daysSinceCreation <= 3) return 25;
        if (daysSinceCreation <= 7) return 50;
        if (daysSinceCreation <= 14) return 75;

        return 90; // Near completion for older tickets
    };
}
