'use client';

import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import CustomSelect from '@/components/form-controls/select';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { Sprint } from '@/store/slices/sprint';

interface SprintSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: Sprint['status'] | 'all';
  onFilterChange: (status: Sprint['status'] | 'all') => void;
}

const SprintSearchFilters: React.FC<SprintSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
      <TextField
        placeholder="Search sprints..."
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
        onChange={(e) => onFilterChange(e.target.value as Sprint['status'] | 'all')}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'planning', label: 'Planning' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
        size="small"
        sx={{ minWidth: 150 }}
      />

      <Tooltip title="Advanced filters">
        <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px' }}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SprintSearchFilters;
