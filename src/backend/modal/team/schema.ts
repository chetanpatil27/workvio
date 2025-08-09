import { Schema } from 'mongoose';
import { ITeam } from './interface';

// Team schema definition
export const teamSchema = new Schema<ITeam>(
    {
        name: {
            type: String,
            required: [true, 'Team name is required'],
            trim: true,
            unique: true,
            minlength: [2, 'Team name must be at least 2 characters long'],
            maxlength: [100, 'Team name cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        leadId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
