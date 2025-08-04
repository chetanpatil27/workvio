'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  TicketHeader,
  TicketSearchFilters,
  TicketList,
  TicketMenu,
  TicketDialog,
  TicketViewModal,
  TicketFormData,
} from './components';
import { useTicket, useTicketDialog } from './hooks';
import { Ticket } from '@/store/slices/ticket';

export default function TicketsPage() {
  // View modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);

  // Main ticket logic
  const {
    tickets,
    ticketStats,
    projects,
    sprints,
    staff,
    selectedTicket,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterType,
    setFilterType,
    filterPriority,
    setFilterPriority,
    filterProject,
    setFilterProject,
    filterSprint,
    setFilterSprint,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleDeleteTicket,
    getProjectName,
    getSprintName,
    getAssigneeName,
  } = useTicket();

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
  } = useTicketDialog();

  // Handle create ticket
  const handleCreateTicket = () => {
    openCreateDialog();
  };

  // Handle edit from menu
  const handleEditTicket = () => {
    if (selectedTicket) {
      openEditDialog(selectedTicket);
      handleMenuClose();
    }
  };

  // Handle view from menu
  const handleViewTicketFromMenu = () => {
    if (selectedTicket) {
      setViewTicket(selectedTicket);
      setViewModalOpen(true);
      handleMenuClose();
    }
  };

  // Handle view ticket from card click
  const handleViewTicketFromCard = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setViewTicket(ticket);
      setViewModalOpen(true);
    }
  };

  // Handle close view modal
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setViewTicket(null);
  };

  // Handle edit from view modal
  const handleEditFromModal = (ticket: Ticket) => {
    setViewModalOpen(false);
    openEditDialog(ticket);
  };

  // Handle delete from view modal
  const handleDeleteFromModal = (ticketId: string) => {
    // TODO: Implement delete confirmation
    console.log('Delete ticket:', ticketId);
    setViewModalOpen(false);
    setViewTicket(null);
  };

  // Get reporter name helper
  const getReporterName = (reporterId: string): string => {
    const reporter = staff.find(s => s.id === reporterId);
    return reporter ? reporter.name : 'Unknown Reporter';
  };

  // Handle save ticket
  const handleSaveTicket = (data: TicketFormData) => {
    // TODO: Implement save ticket logic
    console.log('Save ticket:', data);
    closeDialog();
  };

  // Handle delete with confirmation
  const handleDeleteTicketWithConfirmation = () => {
    // TODO: Implement delete confirmation
    handleDeleteTicket();
  };

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <TicketHeader
        totalTickets={ticketStats.total}
        onCreateTicket={handleCreateTicket}
        ticketStats={ticketStats}
      />

      {/* Search Filters */}
      <TicketSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterType={filterType}
        onTypeChange={setFilterType}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        filterProject={filterProject}
        onProjectChange={setFilterProject}
        filterSprint={filterSprint}
        onSprintChange={setFilterSprint}
        projects={projects}
        sprints={sprints}
      />

      {/* Ticket List */}
      <TicketList
        tickets={tickets}
        onMenuClick={handleMenuClick}
        onViewTicket={handleViewTicketFromCard}
        getProjectName={getProjectName}
        getSprintName={getSprintName}
        getAssigneeName={getAssigneeName}
      />

      {/* Context Menu */}
      <TicketMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onView={handleViewTicketFromMenu}
        onEdit={handleEditTicket}
        onDelete={handleDeleteTicketWithConfirmation}
      />

      {/* Create/Edit Dialog */}
      <TicketDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSave={handleSaveTicket}
        formData={formData}
        onFormDataChange={updateFormData}
        isEditing={isEditing}
        projects={projects}
        sprints={sprints}
        staff={staff}
        isFormValid={isFormValid}
      />

      {/* View Ticket Modal */}
      <TicketViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        ticket={viewTicket}
        getProjectName={getProjectName}
        getSprintName={getSprintName}
        getAssigneeName={getAssigneeName}
        getReporterName={getReporterName}
        onEdit={handleEditFromModal}
        onDelete={handleDeleteFromModal}
      />
    </Box>
  );
}
