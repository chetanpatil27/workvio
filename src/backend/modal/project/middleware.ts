import { Schema } from 'mongoose';
import { IProject } from './interface';

// Apply middleware (pre/post hooks) to the schema
export function applyMiddleware(schema: Schema<IProject>): void {

    // Pre-save middleware to auto-generate project key
    schema.pre('save', function (next) {
        // Auto-generate project key if not provided
        if (!this.key && this.name) {
            // Generate key from project name (first letters of words, max 5 chars)
            const words = this.name.trim().split(/\s+/);
            let key = '';

            if (words.length === 1) {
                // Single word: take first 3-5 characters
                key = words[0].substring(0, Math.min(5, words[0].length)).toUpperCase();
            } else {
                // Multiple words: take first letter of each word, max 5
                key = words.slice(0, 5).map((word: string) => word[0]).join('').toUpperCase();
            }

            this.key = key;
        }

        next();
    });

    // Pre-save middleware to validate relationships
    schema.pre('save', async function (next) {
        try {
            // Validate that leadId exists (if provided)
            if (this.leadId) {
                const User = this.model('User');
                const leadExists = await User.findById(this.leadId);
                if (!leadExists) {
                    throw new Error('Project lead user does not exist');
                }
            }

            // Validate assignees exist
            if (this.assignees && this.assignees.length > 0) {
                const User = this.model('User');
                const assigneeCount = await User.countDocuments({ _id: { $in: this.assignees } });
                if (assigneeCount !== this.assignees.length) {
                    throw new Error('Some assignee users do not exist');
                }
            }

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Post-save middleware for logging/notifications
    schema.post('save', function (doc) {
        // Log project creation/update
        console.log(`Project ${doc.isNew ? 'created' : 'updated'}: ${doc.name} (${doc.key})`);

        // Here you could add notifications, webhooks, etc.
        // Example: Send notification to team members about project updates
    });

    // Pre-remove middleware for cleanup
    schema.pre('deleteOne', { document: true, query: false }, async function (next) {
        try {
            // Clean up related data when project is deleted
            const Sprint = this.model('Sprint');
            const Ticket = this.model('Ticket');

            // Archive related sprints and tickets instead of deleting
            await Sprint.updateMany(
                { projectId: this._id },
                { status: 'archived' }
            );

            await Ticket.updateMany(
                { projectId: this._id },
                { status: 'archived' }
            );

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Pre-update middleware to handle status changes
    schema.pre('findOneAndUpdate', function (next) {
        const update = this.getUpdate() as any;

        // If status is being changed to 'completed', set progress to 100
        if (update.status === 'completed' || update.$set?.status === 'completed') {
            if (update.$set) {
                update.$set.progress = 100;
            } else {
                update.progress = 100;
            }
        }

        // If status is being changed to 'archived', prevent future updates
        if (update.status === 'archived' || update.$set?.status === 'archived') {
            update.updatedAt = new Date();
        }

        next();
    });
}
