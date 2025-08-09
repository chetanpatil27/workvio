import { Schema } from 'mongoose';
import { IProject } from './interface';

// Project schema definition
export const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true,
            minlength: [2, 'Project name must be at least 2 characters long'],
            maxlength: [100, 'Project name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        key: {
            type: String,
            uppercase: true,
            trim: true,
            unique: true,
            sparse: true, // Allow null values but ensure uniqueness when present
            match: [/^[A-Z]{2,10}$/, 'Project key must be 2-10 uppercase letters']
        },
        leadId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'archived', 'completed', 'on-hold', 'planning', 'inprogress', 'onhold'],
            default: 'planning',
            required: [true, 'Project status is required']
        },
        progress: {
            type: Number,
            min: [0, 'Progress cannot be less than 0'],
            max: [100, 'Progress cannot be more than 100'],
            default: 0
        },
        dueDate: {
            type: Date,
            validate: {
                validator: function (this: IProject, value: Date) {
                    // Due date should be after start date if both are provided
                    return !this.startDate || !value || value >= this.startDate;
                },
                message: 'Due date must be after start date'
            }
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        teams: [{
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }],
        assignees: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        sprints: [{
            type: Schema.Types.ObjectId,
            ref: 'Sprint'
        }],
        client: {
            type: String,
            trim: true,
            maxlength: [100, 'Client name cannot exceed 100 characters']
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium'
        },
        color: {
            type: String,
            match: [/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color code'],
            default: '#2196f3'
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        versionKey: false // Removes __v field
    }
);
