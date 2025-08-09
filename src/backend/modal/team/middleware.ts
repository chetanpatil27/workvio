import mongoose from 'mongoose';
import { ITeam } from './interface';

// Apply middleware hooks to the schema
export function applyMiddleware(schema: mongoose.Schema<ITeam>): void {

    // Pre-save middleware to validate team data
    schema.pre('save', async function (next) {

        // Set default values if needed
        if (this.isNew) {
            this.isActive = this.isActive !== undefined ? this.isActive : true;

            // Initialize empty members array if not provided
            if (!this.members) {
                this.members = [];
            }
        }

        // Validate team name uniqueness
        if (this.isModified('name')) {
            const existingTeam = await (this.constructor as mongoose.Model<ITeam>).findOne({
                name: this.name,
                _id: { $ne: this._id },
                isActive: true
            });

            if (existingTeam) {
                throw new Error('Team name must be unique');
            }
        }

        // Ensure team lead is included in members
        if (this.leadId) {
            if (!this.members) {
                this.members = [];
            }

            const leadExists = this.members.some((id: mongoose.Types.ObjectId) =>
                id.toString() === this.leadId?.toString()
            );

            if (!leadExists) {
                this.members.push(this.leadId);
            }
        }

        next();
    });

    // Pre-remove middleware to clean up references
    schema.pre('deleteOne', { document: true, query: false }, async function (next) {
        try {
            // Remove team from all projects
            const Project = mongoose.model('Project');
            await Project.updateMany(
                { teams: this._id },
                { $pull: { teams: this._id } }
            );

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Post-save middleware to update related documents
    schema.post('save', async function (doc, next) {
        try {
            // If team is deactivated, remove from active projects
            if (!doc.isActive) {
                const Project = mongoose.model('Project');
                await Project.updateMany(
                    { teams: doc._id, status: 'active' },
                    { $pull: { teams: doc._id } }
                );
            }

            next();
        } catch (error) {
            next(error as Error);
        }
    });

    // Post-findOneAndUpdate middleware
    schema.post('findOneAndUpdate', async function (doc) {
        if (doc) {
            // Re-run the save middleware logic for updates
            try {
                await doc.save();
            } catch (error) {
                console.error('Error in post-update middleware:', error);
            }
        }
    });

    // Virtual to get member count
    schema.virtual('memberCount').get(function () {
        return this.members ? this.members.length : 0;
    });

    // Ensure virtuals are included in JSON output
    schema.set('toJSON', { virtuals: true });
    schema.set('toObject', { virtuals: true });
}
