'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Ticket } from '@/store/slices/ticket';
import TicketCard from './ticket-card';

interface TicketListProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
  onEditTicket: (ticket: Ticket) => void;
  onDeleteTicket: (ticketId: string) => void;
  getProjectName: (projectId: string) => string;
  getSprintName: (sprintId?: string) => string;
  getAssigneeName: (assigneeId?: string) => string;
}

export default function TicketList({
  tickets,
  onViewTicket,
  onEditTicket,
  onDeleteTicket,
  getProjectName,
  getSprintName,
  getAssigneeName,
}: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No tickets found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria or create a new ticket.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onViewTicket={onViewTicket}
          onEditTicket={onEditTicket}
          onDeleteTicket={onDeleteTicket}
          getProjectName={getProjectName}
          getSprintName={getSprintName}
          getAssigneeName={getAssigneeName}
        />
      ))}
    </Box>
  );
}
