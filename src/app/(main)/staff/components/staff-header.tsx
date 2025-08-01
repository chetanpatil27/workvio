'use client';

import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

interface StaffHeaderProps {
  stats: {
    total: number;
    male: number;
    female: number;
    departments: number;
  };
  selectedTab: number;
  onTabChange: (value: number) => void;
  onCreateStaff: () => void;
}

const StaffHeader: React.FC<StaffHeaderProps> = ({ 
  stats, 
  selectedTab, 
  onTabChange, 
  onCreateStaff 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
              fontSize: '1.75rem'
            }}
          >
            Staff Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Manage team members and employee information
          </Typography>

          {/* Stats Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
            mb: 3
          }}>
            <CountCard
              value={stats.total}
              label="Total Staff"
              icon={<PersonIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.male}
              label="Male"
              icon={<MaleIcon />}
              iconBgColor="rgba(33, 150, 243, 0.1)"
              iconColor="info.main"
            />

            <CountCard
              value={stats.female}
              label="Female"
              icon={<FemaleIcon />}
              iconBgColor="rgba(233, 30, 99, 0.1)"
              iconColor="secondary.main"
            />

            <CountCard
              value={stats.departments}
              label="Departments"
              icon={<BusinessIcon />}
              iconBgColor="rgba(76, 175, 80, 0.1)"
              iconColor="success.main"
            />
          </Box>
        </Box>

        <Button
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateStaff}
          size="lg"
          color="success"
        >
          Add Staff
        </Button>
      </Box>

      {/* Staff Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => onTabChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Staff" />
          <Tab label="Male" />
          <Tab label="Female" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default StaffHeader;
