import { Schema } from 'mongoose';

// Apply indexes to the schema
export function applyIndexes(schema: Schema): void {
    // Single field indexes
    schema.index({ project: 1 });
    schema.index({ status: 1 });
    schema.index({ isActive: 1 });
    schema.index({ startDate: 1 });
    schema.index({ endDate: 1 });
    schema.index({ tickets: 1 });

    // Compound indexes for common queries
    schema.index({ project: 1, status: 1 });
    schema.index({ project: 1, isActive: 1 });
    schema.index({ status: 1, isActive: 1 });
    schema.index({ project: 1, startDate: -1 });
    schema.index({ project: 1, endDate: -1 });
    schema.index({ isActive: 1, startDate: 1, endDate: 1 });

    // Text search index
    schema.index({ name: 'text', description: 'text' });

    // Date range queries
    schema.index({ startDate: 1, endDate: 1 });
    schema.index({ project: 1, startDate: 1, endDate: 1 });

    // Sprint timeline queries
    schema.index({ project: 1, status: 1, startDate: -1 });
}
