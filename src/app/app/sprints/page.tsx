'use client';

import React from 'react';
import { Box } from '@mui/material';
import SprintHeader from './components/sprint-header';
import SprintSearchFilters from './components/sprint-search-filters';
import SprintList from './components/sprint-list';
import SprintDialog from './components/sprint-dialog';
import SprintMenu from './components/sprint-menu';
import { useSprint } from './hooks/use-sprint';
import { useSprintDialog, SprintFormData } from './hooks/use-sprint-dialog';

export default function SprintsPage() {
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

  // Handle edit from menu
  const handleEditSprint = () => {
    if (selectedSprint) {
      openEditDialog(selectedSprint);
    }
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
        onMenuClick={handleMenuClick}
        onCreateSprint={openCreateDialog}
      />

      {/* Context Menu */}
      <SprintMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onView={() => selectedSprint && handleViewSprint(selectedSprint.id)}
        onEdit={handleEditSprint}
        onDelete={handleDeleteSprint}
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
