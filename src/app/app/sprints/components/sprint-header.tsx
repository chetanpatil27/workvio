'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CountCard from '@/components/common/count-card';
import Button from '@/components/form-controls/button';
import {
  Add as AddIcon,
  DirectionsRun as DirectionsRunIcon,
  PlayArrow as PlayArrowIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface SprintHeaderProps {
  stats: {
    total: number;
    active: number;
    planning: number;
    completed: number;
  };
  onCreateSprint: () => void;
}

const SprintHeader: React.FC<SprintHeaderProps> = ({ stats, onCreateSprint }) => {
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
            Sprint Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Manage sprint cycles and track development progress
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
              label="Total Sprints"
              icon={<DirectionsRunIcon />}
              iconBgColor="rgba(25, 118, 210, 0.1)"
              iconColor="primary.main"
            />

            <CountCard
              value={stats.active}
              label="Active Sprints"
              icon={<PlayArrowIcon />}
              iconBgColor="rgba(76, 175, 80, 0.1)"
              iconColor="success.main"
            />

            <CountCard
              value={stats.planning}
              label="Planning"
              icon={<GroupIcon />}
              iconBgColor="rgba(255, 152, 0, 0.1)"
              iconColor="warning.main"
            />

            <CountCard
              value={stats.completed}
              label="Completed"
              icon={<CalendarIcon />}
              iconBgColor="rgba(103, 58, 183, 0.1)"
              iconColor="secondary.main"
            />
          </Box>
        </Box>

        <Button
          variant="filled"
          startIcon={<AddIcon />}
          onClick={onCreateSprint}
          size="lg"
          color="success"
        >
          New Sprint
        </Button>
      </Box>
    </Box>
  );
};

export default SprintHeader;
