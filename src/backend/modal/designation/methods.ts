import { Schema } from 'mongoose';
import { IDesignation } from './interface';

// Apply instance methods to the schema
export function applyInstanceMethods(schema: Schema<IDesignation>): void {

    // Instance method to activate designation
    schema.methods.activate = async function (): Promise<void> {
        this.isActive = true;
        await this.save();
    };

    // Instance method to deactivate designation
    schema.methods.deactivate = async function (): Promise<void> {
        this.isActive = false;
        await this.save();

        // Update users with this designation to remove it
        const User = this.model('User');
        await User.updateMany(
            { designationId: this._id },
            { $unset: { designationId: 1 } }
        );
    };

    // Override toJSON to format data for frontend
    schema.methods.toJSON = function () {
        const designationObject = this.toObject();

        // Transform _id to id for frontend compatibility
        designationObject.id = designationObject._id.toString();
        delete designationObject._id;

        // Format dates as ISO strings
        designationObject.createdAt = designationObject.createdAt.toISOString();
        designationObject.updatedAt = designationObject.updatedAt.toISOString();

        return designationObject;
    };
}
