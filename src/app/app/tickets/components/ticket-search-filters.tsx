'use client';

import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TicketStatus, TicketType, TicketPriority } from '@/store/slices/ticket';
import { TICKET_STATUSES, TICKET_TYPES, TICKET_PRIORITIES } from '../constants/ticket-constants';

interface TicketSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: TicketStatus | 'all';
  onStatusChange: (value: TicketStatus | 'all') => void;
  filterType: TicketType | 'all';
  onTypeChange: (value: TicketType | 'all') => void;
  filterPriority: TicketPriority | 'all';
  onPriorityChange: (value: TicketPriority | 'all') => void;
  filterProject: string | 'all';
  onProjectChange: (value: string | 'all') => void;
  filterSprint: string | 'all';
  onSprintChange: (value: string | 'all') => void;
  projects: Array<{ id: string; name: string }>;
  sprints: Array<{ id: string; name: string }>;
}

export default function TicketSearchFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterType,
  onTypeChange,
  filterPriority,
  onPriorityChange,
  filterProject,
  onProjectChange,
  filterSprint,
  onSprintChange,
  projects,
  sprints,
}: TicketSearchFiltersProps) {
  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {/* First Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        {/* Search */}
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <TextField
            fullWidth
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Status Filter */}
        <Box sx={{ flex: '1 1 160px', minWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => onStatusChange(e.target.value as TicketStatus | 'all')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              {TICKET_STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Type Filter */}
        <Box sx={{ flex: '1 1 160px', minWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              label="Type"
              onChange={(e) => onTypeChange(e.target.value as TicketType | 'all')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Types</MenuItem>
              {TICKET_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Priority Filter */}
        <Box sx={{ flex: '1 1 160px', minWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filterPriority}
              label="Priority"
              onChange={(e) => onPriorityChange(e.target.value as TicketPriority | 'all')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Priorities</MenuItem>
              {TICKET_PRIORITIES.map((priority) => (
                <MenuItem key={priority.value} value={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Project Filter */}
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select
              value={filterProject}
              label="Project"
              onChange={(e) => onProjectChange(e.target.value as string | 'all')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Projects</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Sprint Filter */}
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel>Sprint</InputLabel>
            <Select
              value={filterSprint}
              label="Sprint"
              onChange={(e) => onSprintChange(e.target.value as string | 'all')}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="all">All Sprints</MenuItem>
              <MenuItem value="">No Sprint</MenuItem>
              {sprints.map((sprint) => (
                <MenuItem key={sprint.id} value={sprint.id}>
                  {sprint.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
}
