'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

interface StaffHeaderProps {
  stats: {
    total: number;
    male: number;
    female: number;
    departments: number;
  };
  onCreateStaff: () => void;
}

const StaffHeader: React.FC<StaffHeaderProps> = ({ stats, onCreateStaff }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Enhanced Header with Taskora-style layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              color: "text.primary",
              fontSize: { xs: "1.75rem", md: "2.125rem" },
              mb: 0.5,
            }}
          >
            Staff Management
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: "0.95rem",
              fontWeight: 400,
              mb: { xs: 2, md: 0 },
            }}
          >
            Manage your team members and track their performance
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Filter Button */}
          <Button variant="outlined" startIcon={<FilterIcon />}>
            Filter
          </Button>

          {/* Sort Button */}
          <Button variant="outlined" startIcon={<SortIcon />}>
            Sort
          </Button>

          {/* Add Staff Button */}
          <Button
            variant="filled"
            startIcon={<AddIcon />}
            onClick={onCreateStaff}
          >
            Add Staff
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <CountCard
          value={stats.total}
          label="Total Staff"
          icon={<GroupIcon />}
          iconBgColor="rgba(25, 118, 210, 0.1)"
          iconColor="#1976d2"
        />

        <CountCard
          value={stats.male}
          label="Male"
          icon={<PersonIcon />}
          iconBgColor="rgba(46, 125, 50, 0.1)"
          iconColor="#2e7d32"
        />

        <CountCard
          value={stats.female}
          label="Female"
          icon={<PersonIcon />}
          iconBgColor="rgba(194, 24, 91, 0.1)"
          iconColor="#c2185b"
        />

        <CountCard
          value={stats.departments}
          label="Departments"
          icon={<BusinessIcon />}
          iconBgColor="rgba(245, 124, 0, 0.1)"
          iconColor="#f57c00"
        />
      </Box>
    </Box>
  );
};

export default StaffHeader;
