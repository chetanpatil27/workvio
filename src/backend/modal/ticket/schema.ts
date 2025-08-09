import { Schema } from 'mongoose';
import { ITicket } from './interface';

// Ticket schema definition
export const ticketSchema = new Schema<ITicket>(
    {
        name: {
            type: String,
            required: [true, 'Ticket name is required'],
            trim: true,
            minlength: [3, 'Ticket name must be at least 3 characters long'],
            maxlength: [200, 'Ticket name cannot exceed 200 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [2000, 'Description cannot exceed 2000 characters']
        },
        type: {
            type: String,
            enum: ['Task', 'Bug', 'Story'],
            required: [true, 'Ticket type is required']
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: 'Status',
            required: [true, 'Ticket status is required']
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium',
            required: [true, 'Ticket priority is required']
        },
        teams: [{
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }],
        sprint: {
            type: Schema.Types.ObjectId,
            ref: 'Sprint'
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reporter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Reporter is required']
        },
        estimatedHours: {
            type: Number,
            min: [0, 'Estimated hours cannot be negative'],
            max: [1000, 'Estimated hours cannot exceed 1000']
        },
        actualHours: {
            type: Number,
            min: [0, 'Actual hours cannot be negative'],
            default: 0
        },
        dueDate: {
            type: Date,
            validate: {
                validator: function (this: ITicket, value: Date) {
                    return !value || value > new Date();
                },
                message: 'Due date must be in the future'
            }
        },
        tags: [{
            type: String,
            trim: true,
            maxlength: [50, 'Tag cannot exceed 50 characters']
        }],
        attachments: [{
            type: String,
            trim: true
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
