'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ConfirmationModal } from '@/components/common';
import {
    TeamHeader,
    TeamSearchFilters,
    TeamList,
    TeamMenu,
    TeamDialog,
} from './components';
import { useTeam } from './hooks/use-team';
import { useTeamDialog } from './hooks/use-team-dialog';

export default function TeamsPage() {
    // Main team logic
    const {
        teams,
        teamStats,
        selectedTeam,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        handleViewTeam,
        handleDeleteTeam,
    } = useTeam();

    // Dialog logic
    const {
        isOpen,
        isEditing,
        formData,
        errors,
        isSubmitting,
        openCreateDialog,
        openEditDialog,
        closeDialog,
        handleFormDataChange,
        handleSave,
        addMember,
        removeMember,
        updateMemberRole,
    } = useTeamDialog();

    // Delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    // Handle edit from menu
    const handleEditTeam = () => {
        if (selectedTeam) {
            openEditDialog(selectedTeam);
        }
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        handleDeleteTeam();
        setDeleteDialogOpen(false);
    };

    const handleDeleteClick = () => {
        handleMenuClose();
        setDeleteDialogOpen(true);
    };

    return (
        <Box>
            {/* Header with Stats */}
            <TeamHeader
                stats={teamStats}
                onCreateTeam={openCreateDialog}
            />

            {/* Search and Filters */}
            <TeamSearchFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
            />

            {/* Team List */}
            <TeamList
                teams={teams}
                onTeamClick={handleViewTeam}
                onMenuClick={handleMenuClick}
                onCreateTeam={openCreateDialog}
            />

            {/* Context Menu */}
            <TeamMenu
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onView={() => selectedTeam && handleViewTeam(selectedTeam.id)}
                onEdit={handleEditTeam}
                onDelete={handleDeleteClick}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Team"
                subtitle="This action cannot be undone"
                transition="zoom"
                message={
                    <>
                        Are you sure you want to delete{" "}
                        <strong>{selectedTeam?.name}</strong>? This will remove all team data and member associations.
                    </>
                }
                confirmText="Delete"
                confirmColor="error"
                size="sm"
                transitionDuration={250}
            />

            {/* Create/Edit Dialog */}
            <TeamDialog
                open={isOpen}
                isEditing={isEditing}
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                onClose={closeDialog}
                onSave={handleSave}
                onFormDataChange={handleFormDataChange}
                addMember={addMember}
                removeMember={removeMember}
                updateMemberRole={updateMemberRole}
            />
        </Box>
    );
}
