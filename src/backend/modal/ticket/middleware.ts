import { Schema } from 'mongoose';
import { ITicket } from './interface';

// Apply middleware to the schema
export function applyMiddleware(schema: Schema): void {
    // Pre-validate middleware
    schema.pre('validate', function (this: ITicket) {
        // Ensure arrays are initialized
        if (!this.tags) {
            this.tags = [];
        }
        if (!this.attachments) {
            this.attachments = [];
        }
        if (!this.teams) {
            this.teams = [];
        }

        // Trim string fields
        if (this.name) {
            this.name = this.name.trim();
        }
        if (this.description) {
            this.description = this.description.trim();
        }
    });

    // Pre-save middleware
    schema.pre('save', function (this: ITicket) {
        // Clean up tags array
        if (this.tags) {
            this.tags = this.tags
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
                .filter((tag, index, array) => array.indexOf(tag) === index); // Remove duplicates
        }

        // Clean up attachments array
        if (this.attachments) {
            this.attachments = this.attachments
                .map(attachment => attachment.trim())
                .filter(attachment => attachment.length > 0)
                .filter((attachment, index, array) => array.indexOf(attachment) === index); // Remove duplicates
        }

        // Validate actual hours doesn't exceed unreasonable limits
        if (this.actualHours && this.actualHours > 10000) {
            throw new Error('Actual hours cannot exceed 10000');
        }

        // Auto-assign to sprint if not assigned and project has active sprint
        // This would require a lookup to Sprint model, implement if needed
    });

    // Pre-find middleware
    schema.pre('find', function () {
        // Default populate
        this.populate('teams', 'name')
            .populate('sprint', 'name status startDate endDate')
            .populate('status', 'name color')
            .populate('assignee', 'name email designation')
            .populate('reporter', 'name email designation');
    });

    // Pre-findOne middleware
    schema.pre('findOne', function () {
        // Default populate
        this.populate('teams', 'name')
            .populate('sprint', 'name status startDate endDate')
            .populate('status', 'name color')
            .populate('assignee', 'name email designation')
            .populate('reporter', 'name email designation');
    });

    // Pre-aggregate middleware
    schema.pre('aggregate', function () {
        // Add default match for active tickets in aggregation
        this.pipeline().unshift({ $match: { isActive: true } });
    });
}
