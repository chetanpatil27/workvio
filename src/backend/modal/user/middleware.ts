import * as bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { IUser } from './interface';

// Apply middleware (pre/post hooks) to the schema
export function applyMiddleware(schema: Schema<IUser>): void {

    // Pre-save middleware to hash password
    schema.pre('save', async function (next) {
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified('password')) return next();

        try {
            // Hash password with cost of 12
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Pre-save middleware to validate email uniqueness
    schema.pre('save', async function (next) {
        // Only check if email is modified and not new document
        if (!this.isModified('email') || this.isNew) return next();

        try {
            const UserModel = this.constructor as import('mongoose').Model<IUser>;
            const existingUser = await UserModel.findOne({
                email: this.email,
                _id: { $ne: this._id }
            });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Post-save middleware for logging
    schema.post('save', function (doc) {
        console.log(`User ${doc.isNew ? 'created' : 'updated'}: ${doc.email} (${doc.role})`);
    });

    // Pre-remove middleware for cleanup
    schema.pre('deleteOne', { document: true, query: false }, async function (next) {
        try {
            // Remove user from all projects and teams when deleted
            const Project = this.model('Project');
            const Team = this.model('Team');

            // Remove user from project assignees
            await Project.updateMany(
                { assignees: this._id },
                { $pull: { assignees: this._id } }
            );

            // Remove user from team members
            await Team.updateMany(
                { members: this._id },
                { $pull: { members: this._id } }
            );

            // Update projects where this user is the lead
            await Project.updateMany(
                { leadId: this._id },
                { $unset: { leadId: 1 } }
            );

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Pre-update middleware to prevent password updates through findOneAndUpdate
    schema.pre('findOneAndUpdate', function (next) {
        const update = this.getUpdate() as any;

        // Prevent password updates through direct update operations
        if (update.password || update.$set?.password) {
            return next(new Error('Password cannot be updated directly. Use changePassword method.'));
        }

        // Convert email to lowercase
        if (update.email) {
            update.email = update.email.toLowerCase();
        }
        if (update.$set?.email) {
            update.$set.email = update.$set.email.toLowerCase();
        }

        next();
    });

    // Add custom method for password changes
    schema.methods.changePassword = async function (newPassword: string) {
        this.password = newPassword;
        await this.save();
    };

    // Add method to deactivate user
    schema.methods.deactivate = async function () {
        this.isActive = false;
        await this.save();

        // Remove from active projects and teams
        const Project = this.model('Project');
        const Team = this.model('Team');

        await Project.updateMany(
            { assignees: this._id, status: { $ne: 'archived' } },
            { $pull: { assignees: this._id } }
        );

        await Team.updateMany(
            { members: this._id },
            { $pull: { members: this._id } }
        );
    };

    // Add method to activate user
    schema.methods.activate = async function () {
        this.isActive = true;
        await this.save();
    };
}
