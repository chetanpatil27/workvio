'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  TicketHeader,
  TicketSearchFilters,
  TicketList,
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
  const handleEditTicket = (ticket: Ticket) => {
    openEditDialog(ticket);
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
  const handleDeleteTicketWithConfirmation = (ticketId: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      // TODO: Implement delete ticket logic
      console.log('Delete ticket:', ticketId);
    }
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
        onViewTicket={handleViewTicketFromCard}
        onEditTicket={handleEditTicket}
        onDeleteTicket={handleDeleteTicketWithConfirmation}
        getProjectName={getProjectName}
        getSprintName={getSprintName}
        getAssigneeName={getAssigneeName}
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
