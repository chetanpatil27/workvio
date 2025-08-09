import { Schema } from 'mongoose';
import { ISprint } from './interface';

// Sprint schema definition
export const sprintSchema = new Schema<ISprint>(
    {
        name: {
            type: String,
            required: [true, 'Sprint name is required'],
            trim: true,
            minlength: [2, 'Sprint name must be at least 2 characters long'],
            maxlength: [100, 'Sprint name cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: [true, 'Project is required']
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
            validate: {
                validator: function (this: ISprint, value: Date) {
                    return value > this.startDate;
                },
                message: 'End date must be after start date'
            }
        },
        status: {
            type: String,
            enum: ['planning', 'active', 'completed', 'cancelled'],
            default: 'planning',
            required: [true, 'Status is required']
        },
        goals: [{
            type: String,
            trim: true,
            maxlength: [200, 'Goal cannot exceed 200 characters']
        }],
        tickets: [{
            type: Schema.Types.ObjectId,
            ref: 'Ticket'
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
