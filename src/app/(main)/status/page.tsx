'use client';

import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import StatusHeader from './components/status-header';
import StatusList from './components/status-list';
import StatusMenu from './components/status-menu';
import CreateStatusModal from './components/create-status-modal';
import EditStatusModal from './components/edit-status-modal';
import { useStatus } from './hooks/use-status';

export default function StatusPage() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Main status logic
    const {
        statuses,
        statusStats,
        selectedStatus,
        anchorEl,
        loading,
        handleMenuClick,
        handleMenuClose,
        handleDeleteStatus,
        handleToggleActive,
        handleCreateStatus,
        handleUpdateStatus,
    } = useStatus();

    // Handle create status
    const handleCreateStatusClick = () => {
        setCreateModalOpen(true);
    };

    // Handle edit status click
    const handleEditStatusClick = () => {
        setEditModalOpen(true);
    };

    // Handle create status submit
    const handleCreateSubmit = (statusData: { name: string; color: string; description?: string; active: boolean }) => {
        handleCreateStatus(statusData);
        setCreateModalOpen(false);
    };

    // Handle edit status submit
    const handleEditSubmit = (statusData: { name: string; color: string; description?: string }) => {
        if (selectedStatus) {
            handleUpdateStatus(selectedStatus.id, statusData);
            setEditModalOpen(false);
        }
    };

    // Show loading during SSR hydration
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {/* Header with Stats */}
            <StatusHeader
                stats={statusStats}
                onCreateStatus={handleCreateStatusClick}
            />

            {/* Status List */}
            <StatusList
                statuses={statuses}
                onMenuClick={handleMenuClick}
                onCreateStatus={handleCreateStatusClick}
            />

            {/* Context Menu */}
            <StatusMenu
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onEdit={handleEditStatusClick}
                onDelete={handleDeleteStatus}
                onToggleActive={handleToggleActive}
                selectedStatus={selectedStatus}
            />

            {/* Create Status Modal */}
            <CreateStatusModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateSubmit}
            />

            {/* Edit Status Modal */}
            <EditStatusModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditSubmit}
                status={selectedStatus}
            />
        </Box>
    );
}
