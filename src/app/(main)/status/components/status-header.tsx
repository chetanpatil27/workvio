'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  Label as StatusIcon,
  Star as ActiveIcon,
  Build as DefaultIcon,
  Extension as CustomIcon,
  VisibilityOff as InactiveIcon,
} from '@mui/icons-material';

interface StatusHeaderProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    default: number;
    custom: number;
  };
  onCreateStatus: () => void;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ 
  stats, 
  onCreateStatus 
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
            Status Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Configure dynamic ticket statuses for your workflow
          </Typography>

          {/* Stats Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
            gap: 2.5,
            mb: 3
          }}>
            <CountCard
              value={stats.total}
              label="Total Statuses"
              icon={<StatusIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.active}
              label="Active Statuses"
              icon={<ActiveIcon />}
              iconBgColor="rgba(76, 175, 80, 0.1)"
              iconColor="success.main"
            />

            <CountCard
              value={stats.inactive}
              label="Inactive Statuses"
              icon={<InactiveIcon />}
              iconBgColor="rgba(244, 67, 54, 0.1)"
              iconColor="error.main"
            />

            <CountCard
              value={stats.default}
              label="Default Statuses"
              icon={<DefaultIcon />}
              iconBgColor="rgba(255, 152, 0, 0.1)"
              iconColor="warning.main"
            />

            <CountCard
              value={stats.custom}
              label="Custom Statuses"
              icon={<CustomIcon />}
              iconBgColor="rgba(156, 39, 176, 0.1)"
              iconColor="secondary.main"
            />
          </Box>
        </Box>

        <Button
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateStatus}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            px: 3,
            py: 1.25,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Add Status
        </Button>
      </Box>
    </Box>
  );
};

export default StatusHeader;
