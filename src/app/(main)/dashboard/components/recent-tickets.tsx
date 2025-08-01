'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  BugReport as BugIcon,
  Task as TaskIcon,
  Assignment as StoryIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

interface Ticket {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
}

interface RecentTicketsProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
  onViewAllTickets: () => void;
  getStatusColor: (status: string) => 'success' | 'warning' | 'info' | 'default';
}

const RecentTickets: React.FC<RecentTicketsProps> = ({
  tickets,
  onViewTicket,
  onViewAllTickets,
  getStatusColor,
}) => {
  const getTicketIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <BugIcon color="error" />;
      case 'story':
        return <StoryIcon color="info" />;
      default:
        return <TaskIcon color="primary" />;
    }
  };

  const getPriorityColor = (priority: string): 'error' | 'warning' | 'success' | 'default' => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Recent Tickets
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={onViewAllTickets}
          >
            View All
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Box
                key={ticket.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderColor: 'primary.main',
                  },
                }}
                onClick={() => onViewTicket(ticket.id)}
              >
                <Avatar sx={{ bgcolor: 'secondary.light', mr: 2 }}>
                  {getTicketIcon(ticket.type)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {ticket.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Chip
                      label={ticket.status}
                      size="small"
                      color={getStatusColor(ticket.status)}
                      variant="outlined"
                    />
                    <Chip
                      label={ticket.priority}
                      size="small"
                      color={getPriorityColor(ticket.priority)}
                      variant="filled"
                    />
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
              No recent tickets found
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;
