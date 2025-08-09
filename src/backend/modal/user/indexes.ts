import { Schema } from 'mongoose';

// Apply indexes to the schema
export function applyIndexes(schema: Schema): void {
    // Basic indexes for performance
    schema.index({ email: 1 });
    schema.index({ role: 1 });
    schema.index({ isActive: 1 });
    schema.index({ createdAt: -1 });

    // Staff-related indexes
    schema.index({ employeeId: 1 });
    schema.index({ designation: 1 });
    schema.index({ joiningDate: -1 });

    // Compound indexes for efficient queries
    schema.index({ role: 1, isActive: 1 });
    schema.index({ isActive: 1, createdAt: -1 });
    schema.index({ designation: 1, isActive: 1 });

    // Text index for enhanced search functionality
    schema.index({
        name: 'text',
        email: 'text',
        employeeId: 'text'
    });
}
