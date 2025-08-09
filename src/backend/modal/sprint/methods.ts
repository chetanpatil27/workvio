import mongoose, { Schema } from 'mongoose';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema): void {
    // Sprint lifecycle methods
    schema.methods.activate = function () {
        this.isActive = true;
        if (this.status === 'planning') {
            this.status = 'active';
        }
        return this.save();
    };

    schema.methods.deactivate = function () {
        this.isActive = false;
        return this.save();
    };

    schema.methods.complete = function () {
        this.status = 'completed';
        this.isActive = false;
        return this.save();
    };

    schema.methods.cancel = function () {
        this.status = 'cancelled';
        this.isActive = false;
        return this.save();
    };

    // Goal management methods
    schema.methods.addGoal = function (goal: string) {
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
    };

    schema.methods.removeGoal = function (goal: string) {
        if (!this.goals || this.goals.length === 0) {
            throw new Error('No goals to remove');
        }

        const goalIndex = this.goals.indexOf(goal);
        if (goalIndex === -1) {
            throw new Error('Goal not found');
        }

        this.goals.splice(goalIndex, 1);
        return this.save();
    };

    schema.methods.updateGoal = function (oldGoal: string, newGoal: string) {
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
    };

    // Ticket management methods
    schema.methods.addTicket = function (ticketId: mongoose.Types.ObjectId) {
        if (!ticketId) {
            throw new Error('Ticket ID is required');
        }

        if (!this.tickets) {
            this.tickets = [];
        }

        if (this.tickets.some((id: mongoose.Types.ObjectId) => id.toString() === ticketId.toString())) {
            throw new Error('Ticket already added to sprint');
        }

        this.tickets.push(ticketId);
        return this.save();
    };

    schema.methods.removeTicket = function (ticketId: mongoose.Types.ObjectId) {
        if (!this.tickets || this.tickets.length === 0) {
            throw new Error('No tickets to remove');
        }

        const ticketIndex = this.tickets.findIndex((id: mongoose.Types.ObjectId) => id.toString() === ticketId.toString());
        if (ticketIndex === -1) {
            throw new Error('Ticket not found in sprint');
        }

        this.tickets.splice(ticketIndex, 1);
        return this.save();
    };

    // Status check methods
    schema.methods.isInProgress = function () {
        return this.status === 'active' && this.isActive;
    };

    schema.methods.isCompleted = function () {
        return this.status === 'completed';
    };

    schema.methods.isCancelled = function () {
        return this.status === 'cancelled';
    };

    // Time-related methods
    schema.methods.getDuration = function () {
        return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
    };

    schema.methods.getRemainingDays = function () {
        if (this.status === 'completed' || this.status === 'cancelled') {
            return 0;
        }

        const now = new Date();
        if (now > this.endDate) {
            return 0;
        }

        return Math.ceil((this.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    };

    schema.methods.getProgress = function () {
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
    };
}
