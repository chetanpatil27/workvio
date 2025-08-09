import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/backend/db';
import User from '@/backend/modal/user';

// GET /api/users - Get all active users
export async function GET() {
    try {
        await connectToDB();

        const users = await User.findActiveUsers()
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch users'
            },
            { status: 500 }
        );
    }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const body = await request.json();
        const { email, name, password, role, avatar } = body;

        // Validate required fields
        if (!email || !name || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email, name, and password are required'
                },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User with this email already exists'
                },
                { status: 409 }
            );
        }

        // Create new user
        const user = new User({
            email,
            name,
            password,
            role: role || 'developer',
            avatar
        });

        await user.save();

        // Return user without password
        const userResponse = user.toJSON();

        return NextResponse.json({
            success: true,
            data: userResponse,
            message: 'User created successfully'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error creating user:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: validationErrors
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create user'
            },
            { status: 500 }
        );
    }
}
