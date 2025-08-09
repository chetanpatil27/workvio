import { Schema } from 'mongoose';

// Apply indexes to the schema
export function applyIndexes(schema: Schema): void {
    // Basic indexes
    schema.index({ name: 1 });
    schema.index({ key: 1 });
    schema.index({ leadId: 1 });
    schema.index({ status: 1 });
    schema.index({ priority: 1 });
    schema.index({ dueDate: 1 });
    schema.index({ startDate: 1 });
    schema.index({ teams: 1 });
    schema.index({ assignees: 1 });
    schema.index({ sprints: 1 });
    schema.index({ createdAt: -1 });

    // Compound indexes for better query performance
    schema.index({ status: 1, priority: -1 });
    schema.index({ leadId: 1, status: 1 });
    schema.index({ status: 1, updatedAt: -1 });

    // Text index for search functionality
    schema.index({
        name: 'text',
        description: 'text',
        client: 'text'
    });
}
