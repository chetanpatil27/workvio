import { Schema } from 'mongoose';
import { IDesignation, IDesignationModel } from './interface';

// Apply static methods to the schema
export function applyStaticMethods(schema: Schema<IDesignation>): void {

    // Find designations by level
    schema.statics.findByLevel = function (level: string) {
        return this.find({ level, isActive: true });
    };

    // Find active designations
    schema.statics.findActive = function () {
        return this.find({ isActive: true }).sort({ level: 1, title: 1 });
    };

    // Advanced search with filters
    schema.statics.searchDesignations = function (filters: {
        search?: string;
        level?: string[];
        isActive?: boolean;
    }) {
        const query: any = {};

        // Text search
        if (filters.search) {
            query.$text = { $search: filters.search };
        }

        // Level filter
        if (filters.level && filters.level.length > 0) {
            query.level = { $in: filters.level };
        }

        // Active status filter
        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive;
        }

        return this.find(query).sort({ level: 1, title: 1 });
    };

    // Get designation statistics
    schema.statics.getDesignationStats = function () {
        return this.aggregate([
            {
                $group: {
                    _id: '$level',
                    count: { $sum: 1 },
                    activeCount: {
                        $sum: { $cond: ['$isActive', 1, 0] }
                    }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    };
}
