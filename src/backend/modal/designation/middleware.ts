import { Schema } from 'mongoose';
import { IDesignation } from './interface';

// Apply middleware (pre/post hooks) to the schema
export function applyMiddleware(schema: Schema<IDesignation>): void {

    // Pre-save middleware to validate title uniqueness
    schema.pre('save', async function (next) {
        if (!this.isModified('title') || this.isNew) return next();

        try {
            const existingDesignation = await (this.constructor as any).findOne({
                title: this.title,
                _id: { $ne: this._id }
            });

            if (existingDesignation) {
                throw new Error('Designation title already exists');
            }

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Post-save middleware for logging
    schema.post('save', function (doc) {
        console.log(`Designation ${doc.isNew ? 'created' : 'updated'}: ${doc.title} (${doc.level})`);
    });

    // Pre-remove middleware for cleanup
    schema.pre('deleteOne', { document: true, query: false }, async function (next) {
        try {
            // Remove designation from all users
            const User = this.model('User');
            await User.updateMany(
                { designationId: this._id },
                { $unset: { designationId: 1 } }
            );

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Pre-update middleware
    schema.pre('findOneAndUpdate', function (next) {
        const update = this.getUpdate() as any;

        // Convert title to proper case
        if (update.title) {
            update.title = update.title.trim();
        }
        if (update.$set?.title) {
            update.$set.title = update.$set.title.trim();
        }

        next();
    });
}
