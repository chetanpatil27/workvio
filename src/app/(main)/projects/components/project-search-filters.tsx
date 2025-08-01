'use client';

import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import CustomSelect from '@/components/form-controls/select';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { Project } from '@/store/slices/project';

interface ProjectSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: Project['status'] | 'all';
  onFilterChange: (status: Project['status'] | 'all') => void;
}

const ProjectSearchFilters: React.FC<ProjectSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
      <TextField
        placeholder="Search projects..."
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
          },
        }}
      />
      
      <CustomSelect
        label=""
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value as Project['status'] | 'all')}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'planning', label: 'Planning' },
          { value: 'inprogress', label: 'In Progress' },
          { value: 'on-hold', label: 'On Hold' },
          { value: 'completed', label: 'Completed' },
          { value: 'archived', label: 'Archived' },
        ]}
        size="small"
        sx={{ minWidth: 150 }}
      />

      <Tooltip title="Sort projects">
        <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px' }}>
          <SortIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Advanced filters">
        <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px' }}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ProjectSearchFilters;
