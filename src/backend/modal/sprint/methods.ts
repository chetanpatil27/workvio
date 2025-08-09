import { ISprint } from './interface';

// Sprint instance methods
export function activate(this: ISprint): Promise<ISprint> {
    this.isActive = true;
    if (this.status === 'planning') {
        this.status = 'active';
    }
    return this.save();
}

export function deactivate(this: ISprint): Promise<ISprint> {
    this.isActive = false;
    return this.save();
}

export function complete(this: ISprint): Promise<ISprint> {
    this.status = 'completed';
    this.isActive = false;
    return this.save();
}

export function cancel(this: ISprint): Promise<ISprint> {
    this.status = 'cancelled';
    this.isActive = false;
    return this.save();
}

export function addGoal(this: ISprint, goal: string): Promise<ISprint> {
    if (!goal || goal.trim().length === 0) {
        throw new Error('Goal cannot be empty');
    }

    if (goal.length > 200) {
        throw new Error('Goal cannot exceed 200 characters');
    }

    if (!this.goals) {
        this.goals = [];
    }

    if (this.goals.includes(goal.trim())) {
        throw new Error('Goal already exists');
    }

    this.goals.push(goal.trim());
    return this.save();
}

export function removeGoal(this: ISprint, goal: string): Promise<ISprint> {
    if (!this.goals || this.goals.length === 0) {
        throw new Error('No goals to remove');
    }

    const goalIndex = this.goals.indexOf(goal);
    if (goalIndex === -1) {
        throw new Error('Goal not found');
    }

    this.goals.splice(goalIndex, 1);
    return this.save();
}

export function updateGoal(this: ISprint, oldGoal: string, newGoal: string): Promise<ISprint> {
    if (!newGoal || newGoal.trim().length === 0) {
        throw new Error('New goal cannot be empty');
    }

    if (newGoal.length > 200) {
        throw new Error('Goal cannot exceed 200 characters');
    }

    if (!this.goals || this.goals.length === 0) {
        throw new Error('No goals to update');
    }

    const goalIndex = this.goals.indexOf(oldGoal);
    if (goalIndex === -1) {
        throw new Error('Goal not found');
    }

    if (this.goals.includes(newGoal.trim()) && newGoal.trim() !== oldGoal) {
        throw new Error('Goal already exists');
    }

    this.goals[goalIndex] = newGoal.trim();
    return this.save();
}

export function addTicket(this: ISprint, ticketId: mongoose.Types.ObjectId): Promise<ISprint> {
    if (!ticketId) {
        throw new Error('Ticket ID is required');
    }

    if (!this.tickets) {
        this.tickets = [];
    }

    if (this.tickets.some(id => id.toString() === ticketId.toString())) {
        throw new Error('Ticket already added to sprint');
    }

    this.tickets.push(ticketId);
    return this.save();
}

export function removeTicket(this: ISprint, ticketId: mongoose.Types.ObjectId): Promise<ISprint> {
    if (!this.tickets || this.tickets.length === 0) {
        throw new Error('No tickets to remove');
    }

    const ticketIndex = this.tickets.findIndex(id => id.toString() === ticketId.toString());
    if (ticketIndex === -1) {
        throw new Error('Ticket not found in sprint');
    }

    this.tickets.splice(ticketIndex, 1);
    return this.save();
}

export function isInProgress(this: ISprint): boolean {
    return this.status === 'active' && this.isActive;
}

export function isCompleted(this: ISprint): boolean {
    return this.status === 'completed';
}

export function isCancelled(this: ISprint): boolean {
    return this.status === 'cancelled';
}

export function getDuration(this: ISprint): number {
    return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function getRemainingDays(this: ISprint): number {
    if (this.status === 'completed' || this.status === 'cancelled') {
        return 0;
    }

    const now = new Date();
    if (now > this.endDate) {
        return 0;
    }

    return Math.ceil((this.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getProgress(this: ISprint): number {
    const totalDays = this.getDuration();
    const remainingDays = this.getRemainingDays();

    if (this.status === 'completed') {
        return 100;
    }

    if (this.status === 'cancelled' || totalDays === 0) {
        return 0;
    }

    const elapsedDays = totalDays - remainingDays;
    return Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
}
