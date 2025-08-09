'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeSprint } from '@/store/slices/sprint';
import SprintHeader from './components/sprint-header';
import SprintSearchFilters from './components/sprint-search-filters';
import SprintList from './components/sprint-list';
import SprintDialog from './components/sprint-dialog';
import { useSprint } from './hooks/use-sprint';
import { useSprintDialog, SprintFormData } from './hooks/use-sprint-dialog';

export default function SprintsPage() {
  const dispatch = useDispatch();

  // Main sprint logic
  const {
    sprints,
    sprintStats,
    projects,
    selectedSprint,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleViewSprint,
    handleDeleteSprint,
    handleSaveSprint,
    getProjectName,
    calculateProgress,
  } = useSprint();

  // Dialog logic
  const {
    dialogOpen,
    isEditing,
    formData,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    updateFormData,
    isFormValid,
  } = useSprintDialog();

  // Handle edit sprint
  const handleEditSprint = (sprintId: string) => {
    const sprint = sprints.find(s => s.id === sprintId);
    if (sprint) {
      openEditDialog(sprint);
    }
  };

  // Handle delete sprint
  const handleDeleteSprintById = (sprintId: string) => {
    // For now, let's implement a simple version
    dispatch(removeSprint(sprintId));
  };

  // Handle save sprint
  const handleDialogSave = (formData: SprintFormData, isEditing: boolean) => {
    handleSaveSprint(formData, isEditing);
  };

  return (
    <Box>
      {/* Header with Stats */}
      <SprintHeader
        stats={sprintStats}
        onCreateSprint={openCreateDialog}
      />

      {/* Search and Filters */}
      <SprintSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Sprint List */}
      <SprintList
        sprints={sprints}
        getProjectName={getProjectName}
        calculateProgress={calculateProgress}
        onSprintClick={handleViewSprint}
        onView={handleViewSprint}
        onEdit={handleEditSprint}
        onStart={(sprintId) => {
          // Handle start sprint logic
          console.log('Start sprint:', sprintId);
        }}
        onComplete={(sprintId) => {
          // Handle complete sprint logic
          console.log('Complete sprint:', sprintId);
        }}
        onDelete={handleDeleteSprintById}
        onCreateSprint={openCreateDialog}
      />

      {/* Create/Edit Dialog */}
      <SprintDialog
        open={dialogOpen}
        isEditing={isEditing}
        formData={formData}
        projects={projects}
        onClose={closeDialog}
        onSave={handleDialogSave}
        onFormDataChange={updateFormData}
        isFormValid={isFormValid()}
      />
    </Box>
  );
}
