import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '../../../../backend/db';
import Project from '../../../../backend/modal/project';
import User from '../../../../backend/modal/user';

// GET /api/projects/[id] - Get a specific project
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDB();

        const project = await Project.findById(params.id)
            .populate('leadId', 'name email avatar role')
            .populate('members', 'name email avatar role');

        if (!project) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project not found'
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error('GET /api/projects/[id] error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch project'
            },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Update a specific project
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDB();

        const body = await request.json();

        // Remove fields that shouldn't be updated directly
        const { _id, id, createdAt, ...updateData } = body;

        // Handle date fields
        if (updateData.dueDate) {
            updateData.dueDate = new Date(updateData.dueDate);
        }
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate);
        }

        // Validate lead user exists (if being updated)
        if (updateData.leadId) {
            const leadUser = await User.findById(updateData.leadId);
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

        // Check if project key is being changed and if it already exists
        if (updateData.key) {
            const existingProject = await Project.findOne({
                key: updateData.key.toUpperCase(),
                _id: { $ne: params.id }
            });

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

        const updatedProject = await Project.findByIdAndUpdate(
            params.id,
            updateData,
            { new: true, runValidators: true }
        )
            .populate('leadId', 'name email avatar role')
            .populate('members', 'name email avatar role');

        if (!updatedProject) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project not found'
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedProject
        });

    } catch (error: any) {
        console.error('PUT /api/projects/[id] error:', error);

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
                error: 'Failed to update project'
            },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Delete a specific project (soft delete)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDB();

        // Soft delete by setting status to 'archived'
        const updatedProject = await Project.findByIdAndUpdate(
            params.id,
            { status: 'archived' },
            { new: true }
        );

        if (!updatedProject) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Project not found'
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Project archived successfully',
            data: updatedProject
        });

    } catch (error) {
        console.error('DELETE /api/projects/[id] error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to archive project'
            },
            { status: 500 }
        );
    }
}
