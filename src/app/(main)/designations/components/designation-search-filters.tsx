'use client';

import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

interface DesignationSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DesignationSearchFilters: React.FC<DesignationSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
      <TextField
        placeholder="Search designations..."
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

      <Tooltip title="Sort designations">
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

export default DesignationSearchFilters;
