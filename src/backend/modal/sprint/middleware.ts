import { ISprint } from './interface';

// Sprint middleware functions
export function preValidate(this: ISprint): void {
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
}

export function preSave(this: ISprint): void {
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
}

export function preFind(this: any): void {
    // Default populate
    this.populate('project', 'name description')
        .populate('tickets', 'title status type priority');
}

export function preFindOne(this: any): void {
    // Default populate
    this.populate('project', 'name description')
        .populate('tickets', 'title status type priority');
}
