'use client';

import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import {
  BugReport as BugReportIcon,
  Task as TaskIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Assignment as ProjectIcon,
  Speed as SprintIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Ticket } from '@/store/slices/ticket';
import { getTypeConfig, getStatusConfig, getPriorityConfig } from '../constants/ticket-constants';
import { format } from 'date-fns';
import { Modal } from '@/components/common';

interface TicketViewModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  getProjectName: (projectId: string) => string;
  getSprintName: (sprintId?: string) => string;
  getAssigneeName: (assigneeId?: string) => string;
  getReporterName: (reporterId: string) => string;
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticketId: string) => void;
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

export default function TicketViewModal({
  open,
  onClose,
  ticket,
  getProjectName,
  getSprintName,
  getAssigneeName,
  getReporterName,
  onEdit,
  onDelete,
}: TicketViewModalProps) {
  if (!ticket) return null;

  const typeConfig = getTypeConfig(ticket.type);
  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);

  const projectName = getProjectName(ticket.projectId);
  const sprintName = getSprintName(ticket.sprintId);
  const assigneeName = getAssigneeName(ticket.assigneeId);
  const reporterName = getReporterName(ticket.reporterId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(ticket);
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this ticket?')) {
      onDelete(ticket.id);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ticket Details"
      size="md"
      maxHeight="90vh"
      titleActions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onEdit && (
            <IconButton
              onClick={handleEdit}
              size="small"
              sx={{ color: 'primary.main' }}
            >
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              onClick={handleDelete}
              size="small"
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      }
    >
      <Box sx={{ pb: 2 }}>
        {/* Ticket Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: typeConfig.color + '20',
              color: typeConfig.color,
            }}
          >
            {getTypeIcon(ticket.type)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h5" fontWeight="600">
                {ticket.title}
              </Typography>
              <Chip
                label={ticket.key}
                size="small"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={statusConfig.label}
                size="small"
                sx={{
                  bgcolor: `${statusConfig.color}20`,
                  color: statusConfig.color,
                  fontWeight: 500,
                }}
              />
              <Chip
                label={priorityConfig.label}
                size="small"
                sx={{
                  bgcolor: `${priorityConfig.color}20`,
                  color: priorityConfig.color,
                  fontWeight: 500,
                }}
              />
              <Chip
                label={typeConfig.label}
                size="small"
                sx={{
                  bgcolor: `${typeConfig.color}20`,
                  color: typeConfig.color,
                  fontWeight: 500,
                }}
              />
              {ticket.storyPoints && (
                <Chip
                  label={`${ticket.storyPoints} Story Points`}
                  size="small"
                  sx={{
                    bgcolor: '#f5f5f5',
                    color: '#757575',
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Description */}
        {ticket.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
              Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                backgroundColor: '#f8f9fa',
                padding: 2,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
              }}
            >
              {ticket.description}
            </Typography>
          </Box>
        )}

        {/* Details Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 3, 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ProjectIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Project
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {projectName}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SprintIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Sprint
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {sprintName}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Assignee
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: '0.75rem',
                    bgcolor: statusConfig.color,
                  }}
                >
                  {assigneeName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" fontWeight="500">
                  {assigneeName}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Reporter
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: '0.75rem',
                    bgcolor: 'secondary.main',
                  }}
                >
                  {reporterName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" fontWeight="500">
                  {reporterName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Dates */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, 
          gap: 3, 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Updated
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {format(new Date(ticket.updatedAt), 'MMM dd, yyyy')}
              </Typography>
            </Box>
          </Box>

          {ticket.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon sx={{ fontSize: 20, color: 'error.main' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Due Date
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{
                    color: new Date(ticket.dueDate) < new Date() ? 'error.main' : 'text.primary'
                  }}
                >
                  {format(new Date(ticket.dueDate), 'MMM dd, yyyy')}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Labels */}
        {ticket.labels.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {ticket.labels.map((label, index) => (
                <Chip
                  key={index}
                  label={label}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
