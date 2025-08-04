'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

interface TicketHeaderProps {
  totalTickets: number;
  onCreateTicket: () => void;
  ticketStats: {
    byStatus: {
      todo: number;
      inprogress: number;
      qa: number;
      completed: number;
    };
    byType: {
      task: number;
      bug: number;
      story: number;
    };
  };
}

export default function TicketHeader({ totalTickets, onCreateTicket, ticketStats }: TicketHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Title and Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ConfirmationNumberIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Tickets
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your project tickets and track progress
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateTicket}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Create Ticket
        </Button>
      </Box>

      {/* Stats Chips */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <Chip
          label={`Total: ${totalTickets}`}
          sx={{
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`To Do: ${ticketStats.byStatus.todo}`}
          sx={{
            backgroundColor: '#fafafa',
            color: '#757575',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`In Progress: ${ticketStats.byStatus.inprogress}`}
          sx={{
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`QA: ${ticketStats.byStatus.qa}`}
          sx={{
            backgroundColor: '#fff3e0',
            color: '#ed6c02',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`Completed: ${ticketStats.byStatus.completed}`}
          sx={{
            backgroundColor: '#e8f5e8',
            color: '#2e7d32',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Type Stats */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label={`Tasks: ${ticketStats.byType.task}`}
          sx={{
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`Bugs: ${ticketStats.byType.bug}`}
          sx={{
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
        <Chip
          label={`Stories: ${ticketStats.byType.story}`}
          sx={{
            backgroundColor: '#e8f5e8',
            color: '#2e7d32',
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
}
