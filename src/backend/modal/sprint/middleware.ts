import { Schema } from 'mongoose';
import { ISprint } from './interface';

// Apply middleware to the schema
export function applyMiddleware(schema: Schema): void {
    // Pre-validate middleware
    schema.pre('validate', function (this: ISprint) {
        // Ensure arrays are initialized
        if (!this.goals) {
            this.goals = [];
        }
        if (!this.tickets) {
            this.tickets = [];
        }

        // Trim string fields
        if (this.name) {
            this.name = this.name.trim();
        }
        if (this.description) {
            this.description = this.description.trim();
        }

        // Validate date logic
        if (this.startDate && this.endDate && this.startDate >= this.endDate) {
            throw new Error('Start date must be before end date');
        }

        // Auto-set status based on dates
        const now = new Date();
        if (this.isActive && this.status === 'planning' && this.startDate <= now) {
            this.status = 'active';
        }
    });

    // Pre-save middleware
    schema.pre('save', function (this: ISprint) {
        // Clean up goals array
        if (this.goals) {
            this.goals = this.goals
                .map(goal => goal.trim())
                .filter(goal => goal.length > 0);
        }

        // Validate status transitions
        if (this.isModified('status')) {
            const oldStatus = (this.get('status', null, { getters: false }) as string) || 'planning';
            const newStatus = this.status;

            // Define valid transitions
            const validTransitions: Record<string, string[]> = {
                planning: ['active', 'cancelled'],
                active: ['completed', 'cancelled'],
                completed: [], // Cannot transition from completed
                cancelled: [] // Cannot transition from cancelled
            };

            if (oldStatus !== newStatus && !validTransitions[oldStatus]?.includes(newStatus)) {
                throw new Error(`Invalid status transition from ${oldStatus} to ${newStatus}`);
            }

            // Auto-deactivate when status is completed or cancelled
            if (newStatus === 'completed' || newStatus === 'cancelled') {
                this.isActive = false;
            }
        }
    });

    // Pre-find middleware
    schema.pre('find', function () {
        // Default populate
        this.populate('project', 'name description')
            .populate('tickets', 'title status type priority');
    });

    // Pre-findOne middleware
    schema.pre('findOne', function () {
        // Default populate
        this.populate('project', 'name description')
            .populate('tickets', 'title status type priority');
    });
}
