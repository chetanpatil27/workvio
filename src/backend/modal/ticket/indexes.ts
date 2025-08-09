import { Schema } from 'mongoose';

// Apply indexes to the schema for performance optimization
export function applyIndexes(schema: Schema): void {
    // Basic field indexes
    schema.index({ teams: 1 });
    schema.index({ sprint: 1 });
    schema.index({ assignee: 1 });
    schema.index({ reporter: 1 });
    schema.index({ status: 1 });
    schema.index({ type: 1 });
    schema.index({ priority: 1 });
    schema.index({ isActive: 1 });
    schema.index({ dueDate: 1 });
    schema.index({ tags: 1 });
    schema.index({ createdAt: -1 });

    // Compound indexes for common query patterns
    schema.index({ teams: 1, status: 1 });
    schema.index({ teams: 1, sprint: 1 });
    schema.index({ teams: 1, assignee: 1 });
    schema.index({ teams: 1, type: 1 });
    schema.index({ teams: 1, priority: 1 });
    schema.index({ sprint: 1, status: 1 });
    schema.index({ assignee: 1, status: 1 });
    schema.index({ assignee: 1, dueDate: 1 });
    schema.index({ status: 1, priority: 1 });
    schema.index({ isActive: 1, status: 1 });
    schema.index({ isActive: 1, dueDate: 1 });

    // Text search index for name and description
    schema.index({ name: 'text', description: 'text' });

    // Kanban board optimization
    schema.index({ teams: 1, sprint: 1, status: 1 });
    schema.index({ teams: 1, status: 1, priority: -1 });

    // Time tracking and reporting
    schema.index({ teams: 1, createdAt: -1 });
    schema.index({ assignee: 1, createdAt: -1 });
    schema.index({ reporter: 1, createdAt: -1 });

    // Performance indexes for specific queries
    schema.index({ dueDate: 1, status: 1, isActive: 1 }); // Overdue tickets
    schema.index({ assignee: 1, isActive: 1, priority: -1 }); // Unassigned tickets
}
