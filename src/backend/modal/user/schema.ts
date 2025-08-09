import { Schema } from 'mongoose';
import { IUser } from './interface';

// User schema definition
export const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address'
            ]
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false // Don't include password in queries by default
        },
        avatar: {
            type: String,
            default: null
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'developer', 'tester'],
            default: 'developer',
            required: [true, 'Role is required']
        },
        isActive: {
            type: Boolean,
            default: true
        },

        // Staff-related fields
        designation: {
            type: Schema.Types.ObjectId,
            ref: 'Designation',
            default: null
        },
        employeeId: {
            type: String,
            unique: true,
            sparse: true, // Allows null values while maintaining uniqueness
            trim: true
        },
        joiningDate: {
            type: Date,
            default: null
        },
        phone: {
            type: String,
            trim: true,
            match: [
                /^[\+]?[1-9][\d]{0,15}$/,
                'Please enter a valid phone number'
            ]
        },
        address: {
            type: String,
            trim: true,
            maxlength: [200, 'Address cannot exceed 200 characters']
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        versionKey: false // Removes __v field
    }
);
