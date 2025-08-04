'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  Work as WorkIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
} from '@mui/icons-material';

interface DesignationHeaderProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
  onCreateDesignation: () => void;
}

const DesignationHeader: React.FC<DesignationHeaderProps> = ({ 
  stats, 
  onCreateDesignation 
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
            Designation Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Manage job designations and roles within your organization
          </Typography>

          {/* Stats Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
            gap: 2.5,
            mb: 3
          }}>
            <CountCard
              value={stats.total}
              label="Total Designations"
              icon={<WorkIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.active}
              label="Active Designations"
              icon={<ActiveIcon />}
              iconBgColor="rgba(76, 175, 80, 0.1)"
              iconColor="success.main"
            />

            <CountCard
              value={stats.inactive}
              label="Inactive Designations"
              icon={<InactiveIcon />}
              iconBgColor="rgba(244, 67, 54, 0.1)"
              iconColor="error.main"
            />
          </Box>
        </Box>

        <Button
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateDesignation}
          size="lg"
          color="success"
        >
          New Designation
        </Button>
      </Box>
    </Box>
  );
};

export default DesignationHeader;
