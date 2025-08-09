'use client';

import React from 'react';
import {
  Typography,
  Box,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  BugReport as BugReportIcon,
  Task as TaskIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Ticket } from '@/store/slices/ticket';
import { getTypeConfig, getStatusConfig, getPriorityConfig } from '../constants/ticket-constants';
import { formatDistanceToNow, format } from 'date-fns';
import { CommonCard } from '@/components/common';
import TicketMenu from './ticket-menu';

interface TicketCardProps {
  ticket: Ticket;
  onViewTicket: (ticketId: string) => void;
  onEditTicket: (ticket: Ticket) => void;
  onDeleteTicket: (ticketId: string) => void;
  getProjectName: (projectId: string) => string;
  getSprintName: (sprintId?: string) => string;
  getAssigneeName: (assigneeId?: string) => string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bug':
      return <BugReportIcon />;
    case 'story':
      return <BookIcon />;
    default:
      return <TaskIcon />;
  }
};

export default function TicketCard({
  ticket,
  onViewTicket,
  onEditTicket,
  onDeleteTicket,
  getProjectName,
  getSprintName,
  getAssigneeName,
}: TicketCardProps) {
  const typeConfig = getTypeConfig(ticket.type);
  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);

  const assigneeName = getAssigneeName(ticket.assigneeId);
  const projectName = getProjectName(ticket.projectId);
  const sprintName = getSprintName(ticket.sprintId);

  const handleView = () => {
    onViewTicket(ticket.id);
  };

  const handleEdit = () => {
    onEditTicket(ticket);
  };

  const handleDelete = () => {
    onDeleteTicket(ticket.id);
  };

  return (
    <CommonCard
      interactive
      cardVariant="outlined"
      padding="large"
      onClick={() => onViewTicket(ticket.id)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Ticket Header with Side Color Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
          <Box
            sx={{
              width: 4,
              height: 40,
              borderRadius: '6px',
              bgcolor: statusConfig.color,
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 1,
                  backgroundColor: typeConfig.color + '20',
                  color: typeConfig.color,
                  mr: 0.5,
                }}
              >
                {getTypeIcon(ticket.type)}
              </Box>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.1rem' }}>
                {ticket.title}
              </Typography>
              {ticket.key && (
                <Chip
                  label={ticket.key}
                  size="small"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 20,
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                label={statusConfig.label}
                size="small"
                sx={{
                  bgcolor: `${statusConfig.color}20`,
                  color: statusConfig.color,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  borderRadius: 8,
                  height: 24,
                }}
              />
              <Chip
                label={priorityConfig.label}
                size="small"
                sx={{
                  bgcolor: `${priorityConfig.color}20`,
                  color: priorityConfig.color,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  borderRadius: 8,
                  height: 24,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Menu Button - Same as Sprint Cards */}
        <TicketMenu
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
      {/* Ticket Description */}
      {ticket.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontSize: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {ticket.description}
        </Typography>
      )}

      {/* Due Date */}
      {ticket.dueDate && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            Due: {format(new Date(ticket.dueDate), 'MMM dd, yyyy')}
          </Typography>
        </Box>
      )}

      {/* Ticket Details Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        mb: 2,
      }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
            Project
          </Typography>
          <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
            {projectName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
            Sprint
          </Typography>
          <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
            {sprintName}
          </Typography>
        </Box>
        {ticket.storyPoints && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              Story Points
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
              {ticket.storyPoints}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
            Updated
          </Typography>
          <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.85rem' }}>
            {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      {/* Assignee Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Assignee
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={assigneeName}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: '0.75rem',
                bgcolor: statusConfig.color,
                border: '2px solid',
                borderColor: 'background.paper',
                boxShadow: 1,
              }}
            >
              {assigneeName.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            {assigneeName}
          </Typography>
        </Box>
      </Box>
    </CommonCard>
  );
}
