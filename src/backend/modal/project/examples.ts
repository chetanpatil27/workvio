// Example usage of the new modular Project model

import mongoose from 'mongoose';
import Project, { IProject } from './index';

// Usage examples:

// 1. Create a new project
export async function createProject(projectData: Partial<IProject>) {
    const project = new Project(projectData);
    await project.save();
    return project;
}

// 2. Use instance methods
export async function manageProjectTeams(projectId: string, teamId: string) {
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    // Add team
    project.addTeam(new mongoose.Types.ObjectId(teamId));
    await project.save();

    return project;
}

// 3. Use static methods
export async function getActiveProjects() {
    return await Project.findActiveProjects();
}

// 4. Use advanced search
export async function searchProjects(searchTerm: string) {
    return await Project.searchProjects({
        search: searchTerm,
        status: ['active', 'planning', 'inprogress']
    });
}

// 5. Get project statistics
export async function getProjectDashboardData() {
    const stats = await Project.getProjectStats();
    const activeProjects = await Project.findActiveProjects();

    return {
        stats,
        activeProjects: activeProjects.slice(0, 10) // Top 10 recent
    };
}
