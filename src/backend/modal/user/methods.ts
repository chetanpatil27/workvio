import * as bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { IUser } from './interface';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema<IUser>): void {

    // Instance method to compare password
    schema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (error) {
            throw new Error('Password comparison failed');
        }
    };

    // Instance method to change password
    schema.methods.changePassword = async function (newPassword: string): Promise<void> {
        const saltRounds = 12;
        this.password = await bcrypt.hash(newPassword, saltRounds);
        await this.save();
    };

    // Instance method to deactivate user
    schema.methods.deactivate = async function (): Promise<void> {
        this.isActive = false;
        await this.save();

        // Remove user from all teams
        const Team = mongoose.model('Team');
        await Team.updateMany(
            { members: this._id },
            { $pull: { members: this._id } }
        );

        // Update projects where user is assigned
        const Project = mongoose.model('Project');
        await Project.updateMany(
            { assignees: this._id },
            { $pull: { assignees: this._id } }
        );
    };

    // Instance method to activate user
    schema.methods.activate = async function (): Promise<void> {
        this.isActive = true;
        await this.save();
    };

    // Instance method to update designation
    schema.methods.updateDesignation = async function (designation: mongoose.Types.ObjectId): Promise<void> {
        this.designation = designation;
        await this.save();
    };

    // Override toJSON to exclude sensitive data
    schema.methods.toJSON = function () {
        const userObject = this.toObject();
        delete userObject.password;

        // Transform _id to id for frontend compatibility
        userObject.id = userObject._id.toString();
        delete userObject._id;

        // Convert ObjectIds to strings
        if (userObject.designation) {
            userObject.designation = userObject.designation.toString();
        }

        // Format dates as ISO strings
        userObject.createdAt = userObject.createdAt.toISOString();
        userObject.updatedAt = userObject.updatedAt.toISOString();

        if (userObject.joiningDate) {
            userObject.joiningDate = userObject.joiningDate.toISOString();
        }

        return userObject;
    };
}
