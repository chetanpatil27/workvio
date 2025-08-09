import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '../../../backend/db';
import Project from '../../../backend/modal/project';
import User from '../../../backend/modal/user';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const leadId = searchParams.get('leadId');
        const priority = searchParams.get('priority');
        const member = searchParams.get('member');

        let query: any = {};

        // Build query based on parameters
        if (status) {
            query.status = status;
        }
        if (leadId) {
            query.leadId = leadId;
        }
        if (priority) {
            query.priority = priority;
        }
        if (member) {
            query.members = member;
        }

        const projects = await Project.find(query)
            .populate('leadId', 'name email')
            .populate('members', 'name email')
            .sort({ updatedAt: -1 });

        return NextResponse.json({
            success: true,
            data: projects
        });

    } catch (error) {
        console.error('GET /api/projects error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch projects'
            },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const body = await request.json();
        const {
            name,
            description,
            key,
            leadId,
            status = 'planning',
            dueDate,
            startDate,
            teamMembers = [],
            client,
            budget,
            priority = 'Medium',
            members = [],
            color = '#2196f3'
        } = body;

        // Validate required fields
        if (!name || !description) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Name and description are required'
                },
                { status: 400 }
            );
        }

        // Check if project key already exists (if provided)
        if (key) {
            const existingProject = await Project.findByKey(key);
            if (existingProject) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Project key already exists'
                    },
                    { status: 400 }
                );
            }
        }

        // Validate lead user exists (if provided)
        if (leadId) {
            const leadUser = await User.findById(leadId);
            if (!leadUser) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Project lead user not found'
                    },
                    { status: 400 }
                );
            }
        }

        // Create new project
        const newProject = new Project({
            name,
            description,
            key,
            leadId,
            status,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            startDate: startDate ? new Date(startDate) : new Date(),
            teamMembers,
            client,
            budget,
            priority,
            members,
            color
        });

        const savedProject = await newProject.save();

        // Populate the response
        const populatedProject = await Project.findById(savedProject._id)
            .populate('leadId', 'name email')
            .populate('members', 'name email');

        return NextResponse.json({
            success: true,
            data: populatedProject
        }, { status: 201 });

    } catch (error: any) {
        console.error('POST /api/projects error:', error);

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

        // Handle duplicate key error
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project with this key already exists'
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create project'
            },
            { status: 500 }
        );
    }
}

// PUT /api/projects - Update multiple projects (bulk update)
export async function PUT(request: NextRequest) {
    try {
        await connectToDB();

        const body = await request.json();
        const { projectIds, updates } = body;

        if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project IDs array is required'
                },
                { status: 400 }
            );
        }

        const result = await Project.updateMany(
            { _id: { $in: projectIds } },
            { $set: updates },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount
            }
        });

    } catch (error) {
        console.error('PUT /api/projects error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update projects'
            },
            { status: 500 }
        );
    }
}

// DELETE /api/projects - Delete multiple projects (bulk delete)
export async function DELETE(request: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const projectIds = searchParams.get('ids')?.split(',');

        if (!projectIds || projectIds.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project IDs are required'
                },
                { status: 400 }
            );
        }

        // Soft delete by setting status to 'archived'
        const result = await Project.updateMany(
            { _id: { $in: projectIds } },
            { $set: { status: 'archived' } }
        );

        return NextResponse.json({
            success: true,
            data: {
                deletedCount: result.modifiedCount
            }
        });

    } catch (error) {
        console.error('DELETE /api/projects error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete projects'
            },
            { status: 500 }
        );
    }
}
