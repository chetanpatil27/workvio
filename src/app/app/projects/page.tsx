'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeProject, Project } from '@/store/slices/project';
import ProjectHeader from './components/project-header';
import ProjectSearchFilters from './components/project-search-filters';
import ProjectList from './components/project-list';
import { ProjectDialog } from './components';
import CreateProjectModal from '@/components/project/create-project-modal';
import { ConfirmationModal } from '@/components/common';
import { useProject } from './hooks/use-project';
import { useProjectDialog } from './hooks/use-project-dialog';

export default function ProjectsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const dispatch = useDispatch();

  // Project dialog hook
  const projectDialog = useProjectDialog();

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
    handleViewProject,
    getProjectProgress,
    getProjectSprints,
  } = useProject();

  // Handle create project
  const handleCreateProject = () => {
    setCreateModalOpen(true);
  };

  // Handle edit project
  const handleEditProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      projectDialog.openEditDialog(project);
    }
  };

  // Handle archive project (placeholder for now)
  const handleArchiveProject = (projectId: string) => {
    // TODO: Implement archive functionality
    console.log('Archive project:', projectId);
  };

  // Handle delete project
  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(project);
      setDeleteDialogOpen(true);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      dispatch(removeProject(projectToDelete.id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
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

      {/* Edit Project Dialog */}
      <ProjectDialog
        open={projectDialog.isOpen}
        isEditing={projectDialog.isEditing}
        formData={projectDialog.formData}
        errors={projectDialog.errors}
        isSubmitting={projectDialog.isSubmitting}
        onClose={projectDialog.closeDialog}
        onSave={projectDialog.handleSave}
        onFormDataChange={projectDialog.handleFormDataChange}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        subtitle="This action cannot be undone"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{projectToDelete?.name}</strong>? This action cannot be
            undone.
          </>
        }
        confirmText="Delete"
        confirmColor="error"
        size="sm"
        transition="zoom"
        transitionDuration={250}
      />
    </Box>
  );
}
