'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeProject } from '@/store/slices/project';
import ProjectHeader from './components/project-header';
import ProjectSearchFilters from './components/project-search-filters';
import ProjectList from './components/project-list';
import CreateProjectModal from '@/components/project/create-project-modal';
import { useProject } from './hooks/use-project';

export default function ProjectsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Main project logic
  const {
    projects,
    projectStats,
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    filterStatus,
    setFilterStatus,
    handleViewProject,
    getProjectProgress,
    getProjectSprints,
  } = useProject();

  // Handle create project
  const handleCreateProject = () => {
    setCreateModalOpen(true);
  };

  // Handle edit project (placeholder for now)
  const handleEditProject = (projectId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit project:', projectId);
  };

  // Handle archive project (placeholder for now)
  const handleArchiveProject = (projectId: string) => {
    // TODO: Implement archive functionality
    console.log('Archive project:', projectId);
  };

  // Handle delete project
  const handleDeleteProject = (projectId: string) => {
    dispatch(removeProject(projectId));
  };

  return (
    <Box>
      {/* Header with Stats and Tabs */}
      <ProjectHeader
        stats={projectStats}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onCreateProject={handleCreateProject}
      />

      {/* Search and Filters */}
      <ProjectSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Project List */}
      <ProjectList
        projects={projects}
        getProjectProgress={getProjectProgress}
        getProjectSprints={getProjectSprints}
        onProjectClick={handleViewProject}
        onView={handleViewProject}
        onEdit={handleEditProject}
        onArchive={handleArchiveProject}
        onDelete={handleDeleteProject}
        onCreateProject={handleCreateProject}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={() => setCreateModalOpen(false)}
      />
    </Box>
  );
}
