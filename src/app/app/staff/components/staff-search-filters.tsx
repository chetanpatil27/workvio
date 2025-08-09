'use client';

import React from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { STAFF_TABS, STAFF_TAB_LABELS } from '../constants/staff-filters';

interface StaffSearchFiltersProps {
    searchTerm: string;
    selectedTab: number;
    filteredStaffCount: number;
    activeStaffCount: number;
    onSearchChange: (value: string) => void;
    onTabChange: (value: number) => void;
}

const StaffSearchFilters: React.FC<StaffSearchFiltersProps> = ({
    searchTerm,
    selectedTab,
    filteredStaffCount,
    activeStaffCount,
    onSearchChange,
    onTabChange,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", md: "center" },
                mb: 3,
                gap: 2,
            }}
        >
            {/* Search Bar */}
            <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: 400 } }}>
                <TextField
                    placeholder="Search staff by name, position, or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    size="small"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            bgcolor: "background.paper",
                            height: 44,
                            fontSize: "0.875rem",
                            "& fieldset": {
                                borderColor: "divider",
                            },
                            "&:hover fieldset": {
                                borderColor: "primary.main",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                                borderWidth: "2px",
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{ color: "text.secondary", fontSize: "1.1rem" }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Staff Status Tabs */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={(_, newValue) => onTabChange(newValue)}
                    sx={{
                        "& .MuiTab-root": {
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textTransform: "none",
                            minHeight: 44,
                            px: 2,
                            "&.Mui-selected": {
                                color: "primary.main",
                                fontWeight: 600,
                            },
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "primary.main",
                            height: 3,
                            borderRadius: "6px 6px 0 0",
                        },
                    }}
                >
                    <Tab
                        label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {STAFF_TAB_LABELS[STAFF_TABS.ALL]}
                                <Chip
                                    label={filteredStaffCount}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: "0.75rem",
                                        bgcolor:
                                            selectedTab === STAFF_TABS.ALL ? "primary.main" : "action.hover",
                                        color: selectedTab === STAFF_TABS.ALL ? "white" : "text.secondary",
                                    }}
                                />
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {STAFF_TAB_LABELS[STAFF_TABS.ACTIVE]}
                                <Chip
                                    label={activeStaffCount}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: "0.75rem",
                                        bgcolor:
                                            selectedTab === STAFF_TABS.ACTIVE ? "primary.main" : "action.hover",
                                        color: selectedTab === STAFF_TABS.ACTIVE ? "white" : "text.secondary",
                                    }}
                                />
                            </Box>
                        }
                    />
                </Tabs>
            </Box>
        </Box>
    );
};

export default StaffSearchFilters;
