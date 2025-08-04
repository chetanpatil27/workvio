'use client';

import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';

interface TeamSearchFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filterStatus: 'all' | 'active' | 'inactive';
    onFilterChange: (value: 'all' | 'active' | 'inactive') => void;
}

const TeamSearchFilters: React.FC<TeamSearchFiltersProps> = ({
    searchTerm,
    onSearchChange,
    filterStatus,
    onFilterChange,
}) => {
    return (
        <Box sx={{ 
            mb: 3,
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
        }}>
            {/* Search Input */}
            <TextField
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
                sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: 'divider',
                        },
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                }}
            />

            {/* Status Filter */}
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => onFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
                    sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'divider',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                        },
                    }}
                >
                    <MenuItem value="all">All Teams</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default TeamSearchFilters;
