import { Schema } from 'mongoose';

// Apply indexes to the schema
export function applyIndexes(schema: Schema): void {
    // Basic indexes
    schema.index({ title: 1 });
    schema.index({ level: 1 });
    schema.index({ isActive: 1 });
    schema.index({ createdAt: -1 });

    // Compound indexes
    schema.index({ level: 1, isActive: 1 });

    // Text index for search
    schema.index({
        title: 'text',
        description: 'text'
    });
}
