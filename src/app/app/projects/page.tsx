'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProjectHeader from './components/project-header';
import ProjectSearchFilters from './components/project-search-filters';
import ProjectList from './components/project-list';
import ProjectMenu from './components/project-menu';
import CreateProjectModal from '@/components/project/create-project-modal';
import { useProject } from './hooks/use-project';

export default function ProjectsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Main project logic
  const {
    projects,
    projectStats,
    selectedProject,
    searchTerm,
    setSearchTerm,
    selectedTab,
    setSelectedTab,
    filterStatus,
    setFilterStatus,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleViewProject,
    handleDeleteProject,
    getProjectProgress,
    getProjectSprints,
  } = useProject();

  // Handle create project
  const handleCreateProject = () => {
    setCreateModalOpen(true);
  };

  // Handle edit project (placeholder for now)
  const handleEditProject = () => {
    // TODO: Implement edit functionality
    console.log('Edit project:', selectedProject);
  };

  // Handle archive project (placeholder for now)
  const handleArchiveProject = () => {
    // TODO: Implement archive functionality
    console.log('Archive project:', selectedProject);
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
        onMenuClick={handleMenuClick}
        onCreateProject={handleCreateProject}
      />

      {/* Context Menu */}
      <ProjectMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onView={() => selectedProject && handleViewProject(selectedProject.id)}
        onEdit={handleEditProject}
        onArchive={handleArchiveProject}
        onDelete={handleDeleteProject}
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
