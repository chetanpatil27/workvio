import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/backend/db';
import User from '@/backend/modal/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const body = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email and password are required'
                },
                { status: 400 }
            );
        }

        // Find user by email and include password for comparison
        const user = await User.findOne({ email: email.toLowerCase() })
            .select('+password')
            .exec();

        if (!user || !user.isActive) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid credentials'
                },
                { status: 401 }
            );
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid credentials'
                },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data and token (password excluded via toJSON)
        const userResponse = user.toJSON();

        return NextResponse.json({
            success: true,
            data: {
                user: userResponse,
                token
            },
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Login failed'
            },
            { status: 500 }
        );
    }
}
