import { Schema } from 'mongoose';

// Apply indexes to the schema
export function applyIndexes(schema: Schema): void {
    // Basic indexes
    schema.index({ name: 1 });
    schema.index({ leadId: 1 });
    schema.index({ members: 1 });
    schema.index({ isActive: 1 });
    schema.index({ createdAt: -1 });

    // Compound indexes
    schema.index({ leadId: 1, isActive: 1 });
    schema.index({ isActive: 1, createdAt: -1 });

    // Text index for search
    schema.index({
        name: 'text',
        description: 'text'
    });
}
