import { Schema } from 'mongoose';
import { IDesignation } from './interface';

// Designation schema definition
export const designationSchema = new Schema<IDesignation>(
    {
        title: {
            type: String,
            required: [true, 'Designation title is required'],
            trim: true,
            unique: true,
            minlength: [2, 'Title must be at least 2 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        level: {
            type: String,
            enum: ['junior', 'mid', 'senior', 'lead', 'manager', 'director'],
            required: [true, 'Level is required'],
            default: 'junior'
        },
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
